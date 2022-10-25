package br.gov.lexml.editoremendas;

import java.io.IOException;
import java.io.Writer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import br.gov.lexml.eta.etaservices.util.EtaBackendException;

@RestControllerAdvice(annotations = RestController.class)
@Order(10)
public class RestControllerExceptionHandler {

	private static final Logger log = LoggerFactory.getLogger(RestControllerExceptionHandler.class);

	@ExceptionHandler({EditorEmendasException.class, EtaBackendException.class})
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public void handleEditorEmendasException(Exception e, Writer w) throws IOException {
		log.warn(e.getMessage(), e);
		w.write(e.getMessage());
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	@ResponseBody
	public void handleException(Exception e, Writer w) throws IOException {
		log.error(e.getLocalizedMessage(), e);
		w.write(e.getMessage());
	}

}
