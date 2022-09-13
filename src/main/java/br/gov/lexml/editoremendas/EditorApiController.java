package br.gov.lexml.editoremendas;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import br.gov.lexml.eta.etaservices.printing.json.EmendaPojo;
import br.gov.lexml.eta.etaservices.printing.pdf.PdfGenerator;
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
    
    public EditorApiController(
            PdfGenerator pdfGenerator,
            EmendaJsonGenerator jsonGenerator,
            LexmlJsonixService lexmlJsonixService) {
        this.pdfGenerator = pdfGenerator;
        this.jsonGenerator = jsonGenerator;
        this.lexmlJsonixService = lexmlJsonixService;
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
    public void abreEmendaBase64(@RequestBody final byte[] pdfBase64, HttpServletResponse response) throws Exception {
    	response.setCharacterEncoding(StandardCharsets.UTF_8.name());
    	byte[] pdfBytes = Base64.getDecoder().decode(pdfBase64);
        jsonGenerator.extractJsonFromPdf(new ByteArrayInputStream(pdfBytes), response.getWriter());
    }
    
    @PostMapping(path = "/emenda/pdf2jsonBinary", produces = MediaType.APPLICATION_JSON_VALUE)
    public void abreEmendaBase64(HttpServletRequest request, HttpServletResponse response) throws Exception {
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

        return lexmlJsonixService.getProposicoes(sigla, ano, numero);
    }
    
    @GetMapping(path = "/proposicao/texto-json", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getTextoJson(@RequestParam String sigla,
    		@RequestParam int ano, @RequestParam String numero) {

        return lexmlJsonixService.getTextoProposicaoAsJson(sigla, ano, numero);
    }
    
    // Proxy para chamar serviço temporário heroku em aplicação hospedada no senado
    @GetMapping(path = "/proposicao/texto-json-heroku", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getTextoJsonHeroku(@RequestParam() String sigla, 
    		@RequestParam() String ano, @RequestParam() String numero,
    		RestTemplate restTemplate, HttpServletRequest request) throws Exception {

    	String url = "https://emendas-api.herokuapp.com/proposicao/texto-lexml/json" +
    			"?sigla=" + sigla + "&numero=" + numero + "&ano=" + ano;
    	
    	HttpEntity<String> entity = restTemplate.getForEntity(url, String.class);
    	return entity.getBody();
    }
    
    
}