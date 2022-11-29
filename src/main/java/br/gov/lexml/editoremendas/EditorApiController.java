package br.gov.lexml.editoremendas;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
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
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    private final LandingPageMailService landingPageMailService;
    private final ListaParlamentaresService listaParlamentaresService;

    public EditorApiController(
            PdfGenerator pdfGenerator,
            EmendaJsonGenerator jsonGenerator,
            LexmlJsonixService lexmlJsonixService,
            LexmlParser lexmlParser,
            ConversorLexmlJsonix conversorLexmlJsonix,
            LandingPageMailService landingPageMailService,
            ListaParlamentaresService listaParlamentaresService) {
        this.pdfGenerator = pdfGenerator;
        this.jsonGenerator = jsonGenerator;
        this.lexmlJsonixService = lexmlJsonixService;
        this.lexmlParser = lexmlParser;
        this.conversorLexmlJsonix = conversorLexmlJsonix;
        this.landingPageMailService = landingPageMailService;
        this.listaParlamentaresService = listaParlamentaresService;
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
    public List<Map<String, Object>> listaParlamentares() {
        return listaParlamentaresService.parlamentares();
    }
    
    // Proxy para evitar problemas de cross origin
    @GetMapping(path = "/proposicoes", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Proposicao> listaProposicoes(
            @RequestParam String sigla,
            @RequestParam int ano,
            @RequestParam(required = false) String numero) {

    	List<Proposicao> l = lexmlJsonixService.getProposicoes(sigla, ano, numero);
    	
    	Set<Integer> idsDoma = new HashSet<>();
    	
    	// Retira duplicações
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
    		return IOUtils.toString(is, StandardCharsets.UTF_8);
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

    @PostMapping("contato")
    public ResponseEntity<Void> contato(@RequestBody @NotBlank MensagemLandingPage mensagem) {
        landingPageMailService.sendEmail(mensagem);
        return ResponseEntity.noContent().build();
    }

    
}