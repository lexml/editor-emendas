package br.gov.lexml.editoremendas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class EditorEmendasApplication {

	public static void main(String[] args) {
		System.setProperty("java.net.useSystemProxies", "true");
		SpringApplication.run(EditorEmendasApplication.class, args);
	}
	
	@Bean
	public RestTemplate restTemplate(RestTemplateBuilder builder) {
		return builder.build();
	}	

}
