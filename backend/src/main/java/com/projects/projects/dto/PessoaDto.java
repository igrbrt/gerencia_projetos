package com.projects.projects.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projects.projects.model.Projeto;
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
public class PessoaDto {
    private Long id;
    private String nome;
    private Date dataNascimento;
    private String cpf;
    private Boolean funcionario;
    private List<Projeto> projetos = new ArrayList<>();

    @JsonIgnore
    public List<Projeto> getProjetos() {
        return projetos;
    }
}
