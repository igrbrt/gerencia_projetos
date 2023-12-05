package com.projects.projects.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "pessoa")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String nome;

    @Column(name = "datanascimento")
    private Date dataNascimento;

    @Size(max = 14)
    private String cpf;

    private Boolean funcionario;

    @ManyToMany(cascade = CascadeType.PERSIST, mappedBy = "membros")
    private List<Projeto> projetos = new ArrayList<>();

    @JsonIgnore
    public List<Projeto> getProjetos() {
        return projetos;
    }
}
