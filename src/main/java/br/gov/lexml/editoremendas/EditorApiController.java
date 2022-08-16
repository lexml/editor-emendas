package br.gov.lexml.editoremendas;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class EditorApiController {
    @GetMapping
    public String hello() {
        return "Hello";
    }
}
