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
@Table(name = "projeto")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Projeto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 200)
    private String nome;

    private Date dataInicio;

    private Date dataPrevisaoFim;

    private Date dataFim;

    @Size(max = 5000)
    private String descricao;

    @Enumerated(EnumType.STRING)
    private Status status;

    private Float orcamento;

    @Enumerated(EnumType.STRING)
    private Risco risco;

    @ManyToOne
    @JoinColumn(name = "idgerente")
    private Pessoa gerente;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(name = "membros",
            joinColumns = @JoinColumn(name = "idprojeto"),
            inverseJoinColumns = @JoinColumn(name = "idpessoa"))
    private List<Pessoa> membros = new ArrayList<>();

    @JsonIgnore
    public List<Pessoa> getMembros() {
        return membros;
    }
}
