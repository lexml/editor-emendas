package br.gov.lexml.editoremendas;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.*;

@Service
public class ProposicaoServiceImpl implements ProposicaoService {

    private final RestTemplate restTemplate;

    @Value("${url.servico.permite_texto_livre}")
    private String urlVerificaTextoLivre;

    @Value("${LEXEDITWEB_URL}")
    private String urlLexeditweb;

    public ProposicaoServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public Boolean permiteEmendaTextoLivre(String sigla, String numero, String ano) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<String> reqEntity = new HttpEntity<>(null, headers);

        URI uri = construirUrl(urlLexeditweb, urlVerificaTextoLivre, sigla, numero, ano);
        HttpEntity<Boolean> respEntity = restTemplate.exchange(uri, HttpMethod.GET, reqEntity, Boolean.class);

        return respEntity.getBody();
    }

    private URI construirUrl(String dominio, String path, String sigla, String numero, String ano) {
        return UriComponentsBuilder.newInstance()
                .scheme("https")
                .host(dominio.replaceAll("^https?://", ""))
                .path(path)
                .queryParam("sigla", sigla)
                .queryParam("numero", Integer.valueOf(numero) + "")
                .queryParam("ano", ano)
                .build()
                .toUri();
    }
}

