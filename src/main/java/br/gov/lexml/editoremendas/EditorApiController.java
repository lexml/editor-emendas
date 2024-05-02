package br.gov.lexml.editoremendas;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotBlank;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.gov.lexml.eta.etaservices.emenda.EmendaJsonGenerator;
import br.gov.lexml.eta.etaservices.parsing.lexml.LexmlParser;
import br.gov.lexml.eta.etaservices.printing.json.EmendaPojo;
import br.gov.lexml.eta.etaservices.printing.pdf.PdfGenerator;
import br.leg.camara.lexmljsonixspringbootstarter.conversor.ConversorLexmlJsonix;
import br.leg.camara.lexmljsonixspringbootstarter.service.LexmlJsonixService;
import br.leg.camara.lexmljsonixspringbootstarter.service.Proposicao;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EditorApiController {

    private static final Logger log = LoggerFactory.getLogger(EditorApiController.class);
    
    private static final File tempDir = new File(System.getProperty("java.io.tmpdir"));

    private final PdfGenerator pdfGenerator;
    
    private final EmendaJsonGenerator jsonGenerator;

    private final LexmlJsonixService lexmlJsonixService;
    
    private final LexmlParser lexmlParser;
    
    private final ConversorLexmlJsonix conversorLexmlJsonix;
    private final LandingPageMailService landingPageMailService;
    private final ListaParlamentaresService listaParlamentaresService;
    private final AutoCompleteNormaService autoCompleteNormaService;
    
    private final InfoAppService infoAppService;
    
    public EditorApiController(
            PdfGenerator pdfGenerator,
            EmendaJsonGenerator jsonGenerator,
            LexmlJsonixService lexmlJsonixService,
            LexmlParser lexmlParser,
            ConversorLexmlJsonix conversorLexmlJsonix,
            LandingPageMailService landingPageMailService,
            ListaParlamentaresService listaParlamentaresService,
            InfoAppService infoAppService,
            AutoCompleteNormaService autoCompleteNormaService) {
        this.pdfGenerator = pdfGenerator;
        this.jsonGenerator = jsonGenerator;
        this.lexmlJsonixService = lexmlJsonixService;
        this.lexmlParser = lexmlParser;
        this.conversorLexmlJsonix = conversorLexmlJsonix;
        this.landingPageMailService = landingPageMailService;
        this.listaParlamentaresService = listaParlamentaresService;
        this.infoAppService = infoAppService;
        this.autoCompleteNormaService = autoCompleteNormaService;
    }

    @GetMapping
    public String hello() {
        return "Hello";
    }

    @GetMapping(path = "/data")
    public String data() {
        return new Date().toString();
    }

    @PostMapping(path = "/emenda/json2pdfFile", produces = MediaType.TEXT_PLAIN_VALUE)
    public String salvaEmendaEmArquivoTemporario(@RequestBody final EmendaPojo emenda) throws Exception {
    	File f = new File(tempDir, "emenda-" + UUID.randomUUID() + ".pdf");
    	FileOutputStream fos = new FileOutputStream(f);
        pdfGenerator.generate(emenda, fos);
        fos.flush();
        fos.close();
        return f.getName();
    }
    
    @GetMapping(path = "/emenda/pdfFile/{fileName}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getArquivoTemporario(@PathVariable String fileName, HttpServletResponse response) throws IOException {
    	response.addHeader("Content-Disposition", "inline");
        File f = new File(tempDir, fileName);
        return FileUtils.readFileToByteArray(f);
    }
    
    @PostMapping(path = "/emenda/json2pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] salvaEmenda(@RequestBody final EmendaPojo emenda) throws Exception {
        final ByteArrayOutputStream os = new ByteArrayOutputStream();
        pdfGenerator.generate(emenda, os);
        return os.toByteArray();
    }
    
    // TODO - Apagar método em 2024 :)
    @PostMapping(path = "/emenda/pdf2json", produces = MediaType.APPLICATION_JSON_VALUE)
    public void abreEmenda(HttpServletRequest request, HttpServletResponse response) throws Exception {
        throw new EditorEmendasException("Tecle CTRL+SHIFT+R para atualizar a aplicação.");
    }
    
    @PostMapping(path = "/emenda/pdf2json-novo", produces = MediaType.APPLICATION_JSON_VALUE)
    public void abreEmendaNovo(HttpServletRequest request, HttpServletResponse response) throws Exception {
    	response.setCharacterEncoding(StandardCharsets.UTF_8.name());
    		jsonGenerator.extractJsonFromPdf(request.getInputStream(), response.getWriter());
    }
    
    // Proxy para evitar problemas de cross origin
    @GetMapping(path = "/parlamentares", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Map<String, Object>> listaParlamentares() {
        return listaParlamentaresService.parlamentares();
    }
    
    // TODO - Apagar método em 2024 :)
    @GetMapping(path = "/proposicoes", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Proposicao> listaProposicoes(
            @RequestParam String sigla,
            @RequestParam int ano,
            @RequestParam(required = false) String numero) {

    	return listaProposicoes(sigla);
    }
    
    @GetMapping(path = "/proposicoes-novo", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Proposicao> listaProposicoesNovo(
            @RequestParam String sigla,
            @RequestParam int ano,
            @RequestParam(required = false) String numero,
            @RequestParam(required = false) Boolean carregarDatasDeMPs) {

    	List<Proposicao> l = lexmlJsonixService.getProposicoes(sigla, ano, numero, carregarDatasDeMPs, false);
    	
    	Set<Integer> idsDoma = new HashSet<>();
    	
    	// Retira duplicações
    	return l.stream().filter(p -> idsDoma.add(p.getIdDocumentoManifestacao()))
    			.collect(Collectors.toList());
    }
    
    // TODO - Apagar método em 2024 :)
    @GetMapping(path = "/proposicoesEmTramitacao", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Proposicao> listaProposicoes(
            @RequestParam String sigla) {

    	Proposicao p = new Proposicao();
    	p.setSigla("XXX");
    	p.setNumero("!!!!!!");
    	p.setAno(2023);
    	p.setEmenta("Aplicação desatualizada! Tecle CTRL+SHIFT+R para atualizar.");
    	
    	return Arrays.asList(p);
    }
    
    @GetMapping(path = "/proposicoesEmTramitacao-novo", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Proposicao> listaProposicoesNovo(
            @RequestParam String sigla,
            @RequestParam(required = false) Boolean carregarDatasDeMPs,
            @RequestParam(required = false, defaultValue = "false") Boolean preferirSubstitutivo ) {

    	List<Proposicao> l = lexmlJsonixService.getProposicoesEmTramitacao(sigla, carregarDatasDeMPs, preferirSubstitutivo);
    	
    	Set<Integer> idsDoma = new HashSet<>();
    	
    	// Retira duplicações e MPs anteriores a 2022
    	return l.stream().filter(p -> idsDoma.add(p.getIdDocumentoManifestacao()) && p.getAno() >= 2022)
    			.collect(Collectors.toList());

    }
    
    @GetMapping(path = "/proposicao/texto-json", produces = MediaType.APPLICATION_JSON_VALUE)
    public String getTextoJson(@RequestParam String sigla,
    		@RequestParam int ano, @RequestParam String numero) throws IOException {
    	
    	String resourceName = "/proposicoes/" +
    			sigla.toLowerCase() + "_" + StringUtils.stripStart(numero, "0") + "_" +
    			ano + ".json";
    	InputStream is = EditorApiController.class.getResourceAsStream(resourceName);
    	
    	if (is != null) {
    		return IOUtils.toString(is, StandardCharsets.UTF_8);
    	}

    	String json = lexmlJsonixService.getTextoProposicaoAsJson(sigla, ano, numero, false);
    	
    	if(json.contains("LEXML_URN_ID")) {
		json = json.replace("LEXML_URN_ID", ano + ";" + numero)
				.replace("LEXML_EPIGRAFE_NUMERO", numero)
				.replace("LEXML_EPIGRAFE_DATA", ano + "");
				
    	}
    	
    	return json;
    }
    
    @PostMapping("parser")
    public String parser(@RequestBody @NotBlank String texto) {
        return lexmlParser.parse(texto);
    }
    
    @PostMapping("parser/jsonix")
    public String parserAndJsonix(@RequestBody @NotBlank String texto) {
        return conversorLexmlJsonix.xmlToJson(lexmlParser.parse(texto));
    }

    @PostMapping("contato")
    public ResponseEntity<Void> contato(@RequestBody @NotBlank MensagemLandingPage mensagem) {
        landingPageMailService.sendEmail(mensagem);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("autocomplete-norma")
    public List<Norma> autocompleteNorma(@RequestParam @NotBlank String query) {
        return this.autoCompleteNormaService.autocomplete(query);
    }
    
    @GetMapping("versao")
    public String versao() {
    	return StringUtils.defaultString(infoAppService.versao(), "«desenvolvimento local»");
    }

    
}
