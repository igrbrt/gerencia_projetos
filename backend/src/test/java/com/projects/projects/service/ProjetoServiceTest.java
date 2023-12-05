package com.projects.projects.service;

import com.projects.projects.dto.PessoaDto;
import com.projects.projects.dto.ProjetoDto;
import com.projects.projects.model.Pessoa;
import com.projects.projects.model.Risco;
import com.projects.projects.model.Status;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProjetoServiceTest {
    @Mock
    private ProjetoService projetoService;

    @Mock
    private PessoaService pessoaService;

    ProjetoDto projetoDto;

    Pessoa gerente;

    PessoaDto funcionario;


    @BeforeEach
    public void setup() {
        var dataInicio = Date.from(LocalDate.of(2023, Calendar.OCTOBER, 1).atStartOfDay().toInstant(java.time.ZoneOffset.UTC));
        var dataFim = Date.from(LocalDate.of(2023, Calendar.DECEMBER, 1).atStartOfDay().toInstant(java.time.ZoneOffset.UTC));
        var dataPrevisaoFim = Date.from(LocalDate.of(2023, Calendar.NOVEMBER, 1).atStartOfDay().toInstant(java.time.ZoneOffset.UTC));

        var dataNascimento = Date.from(LocalDate.of(1990, Calendar.FEBRUARY, 1).atStartOfDay().toInstant(java.time.ZoneOffset.UTC));
        gerente = new Pessoa(
                1L,
                "Gerente",
                dataNascimento,
                "12345678901",
                true,
                null
        );

        projetoDto = new ProjetoDto(
                1L,
                "Projeto Teste",
                dataInicio,
                dataPrevisaoFim,
                dataFim,
                "Projeto de teste",
                Status.ANALISE,
                5000.00F,
                Risco.MEDIO,
                gerente,
                null
        );
    }

    @Test
    public void testCriarProjetoComSucesso() {
        when(projetoService.criar(projetoDto)).thenReturn(projetoDto);
        ProjetoDto projetoCriado = projetoService.criar(projetoDto);

        assertEquals(projetoCriado, projetoDto);
        verify(projetoService, times(1)).criar(projetoDto);
        verifyNoMoreInteractions(projetoService);
    }

    @Test
    public void testListarComSucesso() {
        Pageable pageable = Pageable.ofSize(10);
        Page<ProjetoDto> projetos = new PageImpl<>(List.of(projetoDto), pageable, 0);
        when(projetoService.listar(Pageable.ofSize(10))).thenReturn(projetos);
        var projetosRetornadas = projetoService.listar(Pageable.ofSize(10));

        assertNotNull(projetosRetornadas);
        assertNotEquals(projetosRetornadas.getTotalElements(), 0);

        verify(projetoService, times(1)).listar(Pageable.ofSize(10));
        verifyNoMoreInteractions(projetoService);
    }

    @Test
    public void testObterComIdComSucesso() {
        when(projetoService.obterComId(1L)).thenReturn(projetoDto);
        ProjetoDto projetoRetornado = projetoService.obterComId(1L);

        assertEquals(projetoRetornado, projetoDto);
        verify(projetoService, times(1)).obterComId(1L);
        verifyNoMoreInteractions(projetoService);
    }

    @Test
    public void testAtualizarComSucesso() {
        projetoDto.setNome("Projeto Teste Atualização");
        when(projetoService.atualizar(1L, projetoDto)).thenReturn(projetoDto);
        ProjetoDto projetoAtualizado = projetoService.atualizar(1L, projetoDto);

        assertEquals(projetoAtualizado.getNome(), projetoDto.getNome());
        verify(projetoService, times(1)).atualizar(1L, projetoDto);
        verifyNoMoreInteractions(projetoService);
    }

    @Test
    public void testDeletarComSucesso() {
        projetoService.deletar(1L);
        verify(projetoService, times(1)).deletar(1L);
        verifyNoMoreInteractions(projetoService);
    }

    @Test
    public void testErroDeletarProjetoIniciado() {
        projetoDto.setStatus(Status.INICIADO);
        when(projetoService.atualizar(1L, projetoDto)).thenReturn(projetoDto);
        ProjetoDto projetoAtualizado = projetoService.atualizar(1L, projetoDto);
        assertEquals(projetoAtualizado.getStatus(), Status.INICIADO);

        doThrow(new RuntimeException()).when(projetoService).deletar(1L);
        assertThrows(RuntimeException.class, () -> projetoService.deletar(1L));
    }

    @Test
    public void testErroDeletarProjetoAndamento() {
        projetoDto.setStatus(Status.EM_ANDAMENTO);
        when(projetoService.atualizar(1L, projetoDto)).thenReturn(projetoDto);
        ProjetoDto projetoAtualizado = projetoService.atualizar(1L, projetoDto);
        assertEquals(projetoAtualizado.getStatus(), Status.EM_ANDAMENTO);

        doThrow(new RuntimeException()).when(projetoService).deletar(1L);
        assertThrows(RuntimeException.class, () -> projetoService.deletar(1L));
    }

    @Test
    public void testErroDeletarProjetoEncerrado() {
        projetoDto.setStatus(Status.ENCERRADO);
        when(projetoService.atualizar(1L, projetoDto)).thenReturn(projetoDto);
        ProjetoDto projetoAtualizado = projetoService.atualizar(1L, projetoDto);
        assertEquals(projetoAtualizado.getStatus(), Status.ENCERRADO);

        doThrow(new RuntimeException()).when(projetoService).deletar(1L);
        assertThrows(RuntimeException.class, () -> projetoService.deletar(1L));
    }

    @Test
    public void testObterIdComErro() {
        when(projetoService.obterComId(10L)).thenThrow(new RuntimeException());
        assertThrows(RuntimeException.class, () -> projetoService.obterComId(10L));
        verify(projetoService, times(1)).obterComId(10L);
        verifyNoMoreInteractions(projetoService);
    }

    @Test
    public void testAdicionarMembrosProjetoComSucesso() {
        funcionario = new PessoaDto(
                2L,
                "Funcionario",
                null,
                "12345678901",
                true,
                null
        );
        Pessoa pessoa = new Pessoa(
                2L,
                "Funcionario",
                null,
                "12345678901",
                true,
                null
        );
        when(projetoService.criar(projetoDto)).thenReturn(projetoDto);
        ProjetoDto projetoCriado = projetoService.criar(projetoDto);
        assertEquals(projetoCriado, projetoDto);

        when(pessoaService.criar(funcionario)).thenReturn(funcionario);
        PessoaDto funcionarioCriado = pessoaService.criar(funcionario);
        assertEquals(funcionario, funcionarioCriado);

        List<ProjetoDto> membros = List.of(new ProjetoDto(1L, List.of(pessoa)));
        when(projetoService.adicionarMembrosProjeto(1L, membros)).thenReturn("Membros adicionados ao projeto com sucesso!");
        var mensagem = projetoService.adicionarMembrosProjeto(1L, membros);

        assertEquals(mensagem, "Membros adicionados ao projeto com sucesso!");
        verify(projetoService, times(1)).adicionarMembrosProjeto(1L, membros);
        verifyNoMoreInteractions(projetoService);
    }

    @Test
    public void testErroAdicionarMembrosDuplicados(){
        funcionario = new PessoaDto(
                2L,
                "Funcionario",
                null,
                "12345678901",
                true,
                null
        );
        Pessoa pessoa = new Pessoa(
                2L,
                "Funcionario",
                null,
                "12345678901",
                true,
                null
        );
        when(projetoService.criar(projetoDto)).thenReturn(projetoDto);
        ProjetoDto projetoCriado = projetoService.criar(projetoDto);
        assertEquals(projetoCriado, projetoDto);

        when(pessoaService.criar(funcionario)).thenReturn(funcionario);
        PessoaDto funcionarioCriado = pessoaService.criar(funcionario);
        assertEquals(funcionario, funcionarioCriado);

        List<ProjetoDto> membros = List.of(new ProjetoDto(1L, List.of(pessoa)));
        when(projetoService.adicionarMembrosProjeto(1L, membros)).thenReturn("Membros adicionados ao projeto com sucesso!");
        var mensagemSucesso = projetoService.adicionarMembrosProjeto(1L, membros);

        assertEquals(mensagemSucesso, "Membros adicionados ao projeto com sucesso!");

        when(projetoService.adicionarMembrosProjeto(1L, membros)).thenReturn("Funcionario já está no projeto");
        var mensagemErro = projetoService.adicionarMembrosProjeto(1L, membros);

        assertEquals(mensagemErro, "Funcionario já está no projeto");
    }

    @Test
    public void testErroAdicionarMembrosNaoFuncionario(){
        funcionario = new PessoaDto(
                2L,
                "Funcionario",
                null,
                "12345678901",
                false,
                null
        );
        Pessoa pessoa = new Pessoa(
                2L,
                "Funcionario",
                null,
                "12345678901",
                false,
                null
        );
        when(projetoService.criar(projetoDto)).thenReturn(projetoDto);
        ProjetoDto projetoCriado = projetoService.criar(projetoDto);
        assertEquals(projetoCriado, projetoDto);

        when(pessoaService.criar(funcionario)).thenReturn(funcionario);
        PessoaDto funcionarioCriado = pessoaService.criar(funcionario);
        assertEquals(funcionario, funcionarioCriado);

        List<ProjetoDto> membros = List.of(new ProjetoDto(1L, List.of(pessoa)));
        when(projetoService.adicionarMembrosProjeto(1L, membros)).thenReturn("Funcionario não é funcionário");
        var mensagemErro = projetoService.adicionarMembrosProjeto(1L, membros);

        assertEquals(mensagemErro, "Funcionario não é funcionário");
    }
}
