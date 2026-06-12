package br.gov.lexml.editoremendas;

import org.apache.commons.lang3.SystemUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EditorEmendasApplication implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(EditorEmendasApplication.class);
    
    @Value("${url.lexeditweb}")
    private String urlLexeditweb;
	
	public static void main(String[] args) {
		System.setProperty("java.net.useSystemProxies", "true");
		if (SystemUtils.IS_OS_WINDOWS) {
			System.setProperty("lexml-jsonix.cli", "jsonix-lexml-win.exe");
		}else if(SystemUtils.IS_OS_MAC) {
			System.setProperty("lexml-jsonix.cli", "./jsonix-lexml-macos");
		} else {
			System.setProperty("lexml-jsonix.cli", "./jsonix-lexml-linux");
		}

		SpringApplication.run(EditorEmendasApplication.class, args);
	}

    @Override
    public void run(String... args) throws Exception {
        if (System.getProperty("LEXEDITWEB_URL") != null) {
            log.info("Using lexeditweb url from properties: {}", System.getProperty("LEXEDITWEB_URL"));
        } else if (System.getenv().get("LEXEDITWEB_URL") != null) {
            System.setProperty("LEXEDITWEB_URL", System.getenv().get("LEXEDITWEB_URL"));
            log.info("Using lexeditweb url from env: {}", System.getProperty("LEXEDITWEB_URL"));
        } else {
            log.info("Using default lexeditweb production url: {}", urlLexeditweb);
        }
    }
	
}
