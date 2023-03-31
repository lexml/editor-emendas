package br.gov.lexml.editoremendas;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AutoCompleteNormaServiceImpl implements AutoCompleteNormaService {

	private final String URL = "https://www6gdsv.senado.gov.br/sigen/api/lexedit/autocomplete?query={query}";
    private final RestTemplate restTemplate;
    
    public AutoCompleteNormaServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public List<Norma> autocomplete(String query) {
    	
        
        Map<String, String> parameters = Collections.singletonMap("query", query);
        
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<String> reqEntity = new HttpEntity<>(null, headers);

        HttpEntity<Norma[]> respEntity = restTemplate.exchange(URL, HttpMethod.GET, reqEntity, Norma[].class, parameters);

        Norma[] normas = respEntity.getBody();

        if(respEntity.hasBody()) {
        	return Arrays.asList(normas);
        }
        
        return new ArrayList<Norma>();

    }
}

