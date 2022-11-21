package br.gov.lexml.editoremendas;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ListaParlamentaresServiceImpl implements ListaParlamentaresService {

    private final RestTemplate restTemplate;

    public ListaParlamentaresServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public List<Map<String, Object>> parlamentares() {
        String url = "https://legis.senado.gov.br/lexeditweb/resources/shared/parlamentares/";

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> reqEntity = new HttpEntity<>(null, headers);

        HttpEntity<HashMap> respEntity = restTemplate.exchange(url, HttpMethod.GET, reqEntity, HashMap.class);

        Map<String, Object> body = respEntity.getBody();

        assert body != null;

        List<Map<String, Object>> parlamentares = (List<Map<String, Object>>) body.get("parlamentares");

        parlamentares.forEach(p -> {
            String siglaCasa = (String) p.get("siglaCasa");
            if (siglaCasa.equals("CD")) {
                p.put("id", p.get("codigoDeputado"));
            }
            else {
                p.put("id", p.get("codigoParlamentar"));
            }
            p.remove("codigoDeputado");
            p.remove("codigoParlamentar");
            p.put("siglaUF", p.get("siglaUf"));
            p.remove("siglaUf");
        });

        return parlamentares;

    }
}

