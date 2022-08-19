package br.gov.lexml.editoremendas;

import br.gov.lexml.eta.etaservices.emenda.Emenda;
import br.gov.lexml.eta.etaservices.printing.pdf.PdfGenerator;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class EditorApiController {

    private final PdfGenerator pdfGenerator;

    public EditorApiController(PdfGenerator pdfGenerator) {
        this.pdfGenerator = pdfGenerator;
    }

    @GetMapping
    public String hello() {
        return "Hello";
    }

    @PostMapping(produces = "application/pdf")
    public byte[] salvaEmenda(Emenda emenda) throws IOException {
        final ByteArrayOutputStream os = new ByteArrayOutputStream();
        pdfGenerator.generate(emenda, os);
        return os.toByteArray();
    }
}