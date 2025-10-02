package br.gov.lexml.editoremendas;

import org.apache.commons.lang3.SystemUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EditorEmendasApplication {
    private static final Logger log = LoggerFactory.getLogger(EditorEmendasApplication.class);
	
	public static void main(String[] args) {
		System.setProperty("java.net.useSystemProxies", "true");
		if (SystemUtils.IS_OS_WINDOWS) {
			System.setProperty("lexml-jsonix.cli", "jsonix-lexml-win.exe");
		}else if(SystemUtils.IS_OS_MAC) {
			System.setProperty("lexml-jsonix.cli", "./jsonix-lexml-macos");
		} else {
			System.setProperty("lexml-jsonix.cli", "./jsonix-lexml-linux");
		}

        if (System.getProperty("LEXEDITWEB_URL") != null) {
            log.info("Using lexeditweb url from properties: {}", System.getProperty("LEXEDITWEB_URL"));
        } else if (System.getenv().get("LEXEDITWEB_URL") != null) {
            System.setProperty("LEXEDITWEB_URL", System.getenv().get("LEXEDITWEB_URL"));
            log.info("Using lexeditweb url from env: {}", System.getProperty("LEXEDITWEB_URL"));
        } else {
            System.setProperty("LEXEDITWEB_URL", "https://legis.senado.leg.br/lexeditweb");
            log.info("Using default lexeditweb production url: {}", System.getProperty("LEXEDITWEB_URL"));
        }
		SpringApplication.run(EditorEmendasApplication.class, args);
	}
	
}
