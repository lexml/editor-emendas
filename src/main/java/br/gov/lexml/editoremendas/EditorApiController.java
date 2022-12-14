package br.gov.lexml.editoremendas;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotBlank;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import br.gov.lexml.eta.etaservices.emenda.EmendaJsonGenerator;
import br.gov.lexml.eta.etaservices.parsing.lexml.LexmlParser;
import br.gov.lexml.eta.etaservices.printing.json.EmendaPojo;
import br.gov.lexml.eta.etaservices.printing.pdf.PdfGenerator;
import br.leg.camara.lexmljsonixspringbootstarter.conversor.ConversorLexmlJsonix;
import br.leg.camara.lexmljsonixspringbootstarter.service.LexmlJsonixService;
import br.leg.camara.lexmljsonixspringbootstarter.service.Proposicao;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EditorApiController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EditorApiController.class);

    private final PdfGenerator pdfGenerator;
    
    private final EmendaJsonGenerator jsonGenerator;

    private final LexmlJsonixService lexmlJsonixService;
    
    private final LexmlParser lexmlParser;
    
    private final ConversorLexmlJsonix conversorLexmlJsonix;
    
    public EditorApiController(
            PdfGenerator pdfGenerator,
            EmendaJsonGenerator jsonGenerator,
            LexmlJsonixService lexmlJsonixService,
            LexmlParser lexmlParser,
            ConversorLexmlJsonix conversorLexmlJsonix) {
        this.pdfGenerator = pdfGenerator;
        this.jsonGenerator = jsonGenerator;
        this.lexmlJsonixService = lexmlJsonixService;
        this.lexmlParser = lexmlParser;
        this.conversorLexmlJsonix = conversorLexmlJsonix;
    }

    @GetMapping
    public String hello() {
        return "Hello";
    }

    @PostMapping(path = "/emenda/json2pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] salvaEmenda(@RequestBody final EmendaPojo emenda) throws IOException {
        LOGGER.info("emenda: {}", emenda);
        final ByteArrayOutputStream os = new ByteArrayOutputStream();
        pdfGenerator.generate(emenda, os);
        return os.toByteArray();
    }
    
    @PostMapping(path = "/emenda/pdf2json", produces = MediaType.APPLICATION_JSON_VALUE)
    public void abreEmenda(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	response.setCharacterEncoding(StandardCharsets.UTF_8.name());
        jsonGenerator.extractJsonFromPdf(request.getInputStream(), response.getWriter());
    }
    
    // Proxy para evitar problemas de cross origin
    @GetMapping(path = "/parlamentares", produces = MediaType.APPLICATION_JSON_VALUE)
    public Object listaParlamentares(RestTemplate restTemplate) throws Exception {   	

    	String url = "https://legis.senado.gov.br/lexeditweb/resources/shared/parlamentares/";
    	
    	HttpHeaders headers = new HttpHeaders();
    	headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

    	HttpEntity<String> reqEntity = new HttpEntity<>(null, headers);

    	HttpEntity<HashMap> respEntity = restTemplate.exchange(url, HttpMethod.GET, reqEntity, HashMap.class);
    	
    	List<Map<String, Object>> parlamentares = (List<Map<String, Object>>) respEntity.getBody().get("parlamentares");
    	
    	parlamentares.forEach(p -> {
    		String siglaCasa = (String) p.get("siglaCasa");
    		if (siglaCasa.equals("CD")) {
    			p.put("id", p.get("codigoDeputado"));
    		}
    		else {
    			p.put("id", p.get("codigoParlamentar"));
    		}
    		p.remove("codigoDeputado");
    		p.remove("codigoParlamentar");
    		p.put("siglaUF", p.get("siglaUf"));
    		p.remove("siglaUf");
    	});
    	
    	return parlamentares;
    }
    
    // Proxy para evitar problemas de cross origin
    @GetMapping(path = "/proposicoes", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Proposicao> listaProposicoes(
            @RequestParam String sigla,
            @RequestParam int ano,
            @RequestParam(required = false) String numero) {

    	List<Proposicao> l = lexmlJsonixService.getProposicoes(sigla, ano, numero);
    	
    	Set<Integer> idsDoma = new HashSet<>();
    	
    	// Retira duplica????es
    	return l.stream().filter(p -> idsDoma.add(p.getIdDocumentoManifestacao()))
    			.collect(Collectors.toList());
    }
    
    @GetMapping(path = "/proposicao/texto-json", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getTextoJson(@RequestParam String sigla,
    		@RequestParam int ano, @RequestParam String numero) throws IOException {
    	
    	String resourceName = "/proposicoes/" +
    			sigla.toLowerCase() + "_" + StringUtils.stripStart(numero, "0") + "_" +
    			ano + ".json";
    	InputStream is = EditorApiController.class.getResourceAsStream(resourceName);
    	
    	if (is != null) {
    		return IOUtils.toString(is, "UTF-8");
    	}

    	String json = lexmlJsonixService.getTextoProposicaoAsJson(sigla, ano, numero);
    	
    	if(json.contains("LEXML_URN_ID")) {
		json = json.replace("LEXML_URN_ID", ano + ";" + numero)
				.replace("LEXML_EPIGRAFE_NUMERO", numero)
				.replace("LEXML_EPIGRAFE_DATA", ano + "");
				
    	}
    	
    	return json;
    }
    
    @PostMapping("parser")
    public String parser(@RequestBody @NotBlank String texto) {
        return lexmlParser.parse(texto);
    }
    
    @PostMapping("parser/jsonix")
    public String parserAndJsonix(@RequestBody @NotBlank String texto) {
        return conversorLexmlJsonix.xmlToJson(lexmlParser.parse(texto));
    }
    
}