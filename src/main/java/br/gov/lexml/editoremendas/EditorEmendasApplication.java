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

        if (System.getProperty("spring.profiles.active") == null) {
            log.info("Using lexeditweb production url");
            System.setProperty("LEXEDITWEB_URL", "https://legis.senado.leg.br/lexeditweb");
        }
		SpringApplication.run(EditorEmendasApplication.class, args);
	}
	
}
