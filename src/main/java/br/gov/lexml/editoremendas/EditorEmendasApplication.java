package br.gov.lexml.editoremendas;

import org.apache.commons.lang3.SystemUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EditorEmendasApplication {
	
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
	
}
