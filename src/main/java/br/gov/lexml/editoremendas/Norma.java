package br.gov.lexml.editoremendas;

import java.util.List;

public class Norma {
	
	private String urn;
	private String nomePreferido;
	private List<String> nomesAlternativos;
	private List<String> nomes;
	private String ementa;
	private String nomePorExtenso;
	public String getUrn() {
		return urn;
	}
	public void setUrn(String urn) {
		this.urn = urn;
	}
	public String getNomePreferido() {
		return nomePreferido;
	}
	public void setNomePreferido(String nomePreferido) {
		this.nomePreferido = nomePreferido;
	}
	public List<String> getNomesAlternativos() {
		return nomesAlternativos;
	}
	public void setNomesAlternativos(List<String> nomesAlternativos) {
		this.nomesAlternativos = nomesAlternativos;
	}
	public List<String> getNomes() {
		return nomes;
	}
	public void setNomes(List<String> nomes) {
		this.nomes = nomes;
	}
	public String getEmenta() {
		return ementa;
	}
	public void setEmenta(String ementa) {
		this.ementa = ementa;
	}
	public String getNomePorExtenso() {
		return nomePorExtenso;
	}
	public void setNomePorExtenso(String nomePorExtenso) {
		this.nomePorExtenso = nomePorExtenso;
	}
	
	
	
}
