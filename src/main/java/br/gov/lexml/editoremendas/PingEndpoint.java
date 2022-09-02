package br.gov.lexml.editoremendas;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sfstatus/ping")
public class PingEndpoint {
    @GetMapping
    public String ping() {
        return "pong";
    }

}
