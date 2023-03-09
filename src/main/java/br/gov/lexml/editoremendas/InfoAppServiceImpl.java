package br.gov.lexml.editoremendas;

import org.springframework.stereotype.Service;

@Service
public class InfoAppServiceImpl implements InfoAppService {

	@Override
	public String versao() {
		return this.getClass().getPackage().getImplementationVersion();
	}


}

