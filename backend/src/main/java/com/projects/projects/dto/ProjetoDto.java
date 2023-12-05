package com.projects.projects.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projects.projects.model.Pessoa;
import com.projects.projects.model.Risco;
import com.projects.projects.model.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProjetoDto {
    private Long id;
    private String nome;
    private Date dataInicio;
    private Date dataPrevisaoFim;
    private Date dataFim;
    private String descricao;
    private Status status;
    private Float orcamento;
    private Risco risco;
    private Pessoa gerente;
    private List<Pessoa> membros = new ArrayList<>();

    public ProjetoDto(Long id, List<Pessoa> membros) {
        this.id = id;
        this.membros = membros;
    }

    @JsonIgnore
    public List<Pessoa> getMembros() {
        return membros;
    }
}
