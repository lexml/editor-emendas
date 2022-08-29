package br.gov.lexml.editoremendas;

import br.gov.lexml.eta.etaservices.parsing.xml.EmendaXmlUnmarshaller;
import br.gov.lexml.eta.etaservices.printing.pdf.PdfGenerator;
import br.gov.lexml.eta.etaservices.printing.pdf.PdfGeneratorBean;
import br.gov.lexml.eta.etaservices.printing.pdf.VelocityTemplateProcessorFactory;
import br.gov.lexml.eta.etaservices.printing.xml.EmendaXmlMarshaller;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EmendaXmlConfiguration {
    @Bean
    EmendaXmlMarshaller emendaXmlMarshaller() {
        return new EmendaXmlMarshaller();
    }

    @Bean
    EmendaXmlUnmarshaller emendaXmlUnmarshaller() {
        return new EmendaXmlUnmarshaller();
    }

    @Bean
    VelocityTemplateProcessorFactory velocityTemplateProcessor() {
        return new VelocityTemplateProcessorFactory();
    }

    @Bean
    PdfGenerator pdfGenerator(VelocityTemplateProcessorFactory templateProcessorFactory, EmendaXmlMarshaller emendaXmlMarshaller) {
        return new PdfGeneratorBean(templateProcessorFactory, emendaXmlMarshaller);
    }
}
