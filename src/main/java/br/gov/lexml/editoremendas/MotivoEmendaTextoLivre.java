package br.gov.lexml.editoremendas;

public class MotivoEmendaTextoLivre {
    public final String ASSUNTO = "Nova emenda de texto livre";
    private final String TEXTO = "Nova emenda de texto livre \n\n\n";
    private String motivo;

	public String getMensagem() {
		return TEXTO.concat(motivo);
	}

	public String getMotivo() {
		return motivo;
	}

	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}

	
    
}
