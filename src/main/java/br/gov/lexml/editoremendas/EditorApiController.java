package br.gov.lexml.editoremendas;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
    public void salvaEmenda(@RequestBody final EmendaPojo emenda, HttpServletResponse response) throws IOException {
        LOGGER.info("emenda: {}", emenda);
        pdfGenerator.generate(emenda, response.getOutputStream());
    }
    
    @PostMapping(path = "/emenda/pdf2json", produces = MediaType.APPLICATION_JSON_VALUE)
    public void abreEmendaBase64(@RequestBody final byte[] pdfBase64, HttpServletResponse response) throws Exception {
    	response.setCharacterEncoding(StandardCharsets.UTF_8.name());
    	byte[] pdfBytes = Base64.getDecoder().decode(pdfBase64);
        jsonGenerator.extractJsonFromPdf(new ByteArrayInputStream(pdfBytes), response.getWriter());
    }
    
    // TODO Remover se a outra forma for melhor
    @PostMapping(path = "/emenda/pdf2jsonMultipart", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void abreEmendaMultipart(@RequestParam("file") MultipartFile file, HttpServletResponse response) throws Exception {
    	response.setCharacterEncoding(StandardCharsets.UTF_8.name());
    	jsonGenerator.extractJsonFromPdf(file.getInputStream(), response.getWriter());
    }
    
}