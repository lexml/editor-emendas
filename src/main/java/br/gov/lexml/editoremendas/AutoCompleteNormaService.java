package br.gov.lexml.editoremendas;

import java.util.List;

public interface AutoCompleteNormaService {
    List<Norma> autocomplete(String query);
}
