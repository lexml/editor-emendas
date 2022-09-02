package br.gov.lexml.editoremendas;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
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

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EditorApiController {

    private static final Logger LOGGER = LoggerFactory.getLogger(EditorApiController.class);

    private final PdfGenerator pdfGenerator;
    
    private final EmendaJsonGenerator jsonGenerator;
    
    public EditorApiController(PdfGenerator pdfGenerator, EmendaJsonGenerator jsonGenerator) {
        this.pdfGenerator = pdfGenerator;
        this.jsonGenerator = jsonGenerator;
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
    @GetMapping(path = "/proposicoes", produces = MediaType.APPLICATION_JSON_VALUE)
    public String listaProposicoes(@RequestParam() String sigla, 
    		@RequestParam() String ano, @RequestParam(required = false) String numero, 
    		RestTemplate restTemplate) throws Exception {   	

    	// https://legis.senado.gov.br/legis/resources/lex/proposicoes/MPV/2022?numero=1096
    	String url = "https://legis.senado.gov.br/legis/resources/lex/proposicoes/" +
    			sigla + "/" + ano + (numero != null ? "?numero=" + numero : "");
    	
    	HttpEntity<String> entity = restTemplate.getForEntity(url, String.class);
    	return entity.getBody();
    }
    
}