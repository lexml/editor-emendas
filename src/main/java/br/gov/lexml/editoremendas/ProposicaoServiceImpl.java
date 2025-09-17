package br.gov.lexml.editoremendas;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.Serializable;
import java.util.*;

@Service
public class ProposicaoServiceImpl implements ProposicaoService {

    private final RestTemplate restTemplate;

    @Value("${url.servico.permite_texto_livre}")
    private String urlGetProcesso;

    @Value("${LEXEDITWEB_URL}")
    private String urlLexeditweb;

    public ProposicaoServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public Boolean permiteEmendaTextoLivre(String sigla, String numero, String ano) {

        Map<String, String> parameters = Map.of(
                "sigla", sigla,
                "numero", numero,
                "ano", ano);

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> reqEntity = new HttpEntity<>(null, headers);

        HttpEntity<Boolean> respEntity = restTemplate.exchange(urlLexeditweb + urlGetProcesso, HttpMethod.GET, reqEntity, Boolean.class, parameters);

        return respEntity.getBody();
    }
}

