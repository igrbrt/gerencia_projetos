package com.projects.projects.service;

import com.projects.projects.dto.PessoaDto;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PessoaServiceTest {

    @Mock
    private PessoaService pessoaService;

    PessoaDto pessoaDto;

    @BeforeEach
    public void setup() {
        var dataNascimento = Date.from(LocalDate.of(1990, Calendar.FEBRUARY, 1).atStartOfDay().toInstant(java.time.ZoneOffset.UTC));
        pessoaDto = new PessoaDto(
                1L,
                "Teste",
                dataNascimento,
                "12345678901",
                true,
                null
        );
    }

    @Test
    public void testCriarPessoaComSucesso() {
        when(pessoaService.criar(pessoaDto)).thenReturn(pessoaDto);
        PessoaDto pessoaCriada = pessoaService.criar(pessoaDto);

        assertEquals(pessoaCriada, pessoaDto);
        verify(pessoaService, times(1)).criar(pessoaDto);
        verifyNoMoreInteractions(pessoaService);
    }

    @Test
    public void testObterComIdComSucesso() {
        when(pessoaService.obterComId(1L)).thenReturn(pessoaDto);
        PessoaDto pessoaRetornada = pessoaService.obterComId(1L);

        assertEquals(pessoaRetornada, pessoaDto);
        verify(pessoaService, times(1)).obterComId(1L);
        verifyNoMoreInteractions(pessoaService);
    }

    @Test
    public void testListarComSucesso() {
        Pageable pageable = Pageable.ofSize(10);
        Page<PessoaDto> pessoas = new PageImpl<>(List.of(pessoaDto), pageable, 0);
        when(pessoaService.listar(Pageable.ofSize(10))).thenReturn(pessoas);
        var pessoasRetornadas = pessoaService.listar(Pageable.ofSize(10));

        assertNotNull(pessoasRetornadas);
        assertNotEquals(pessoasRetornadas.getTotalElements(), 0);

        verify(pessoaService, times(1)).listar(Pageable.ofSize(10));
        verifyNoMoreInteractions(pessoaService);
    }

    @Test
    public void testAtualizarComSucesso() {
        pessoaDto.setNome("Teste Atualização");
        when(pessoaService.atualizar(1L, pessoaDto)).thenReturn(pessoaDto);
        PessoaDto pessoaAtualizada = pessoaService.atualizar(1L, pessoaDto);

        assertEquals(pessoaAtualizada.getNome(), pessoaDto.getNome());
        verify(pessoaService, times(1)).atualizar(1L, pessoaDto);
        verifyNoMoreInteractions(pessoaService);
    }

    @Test
    public void testDeletarComSucesso() {
        pessoaService.deletar(1L);

        given(pessoaService.obterComId(1L)).willThrow(new EntityNotFoundException());
        assertThrows(EntityNotFoundException.class, () -> pessoaService.obterComId(1L));

        verify(pessoaService, times(1)).deletar(1L);
        verifyNoMoreInteractions(pessoaService);
    }

    @Test
    public void testObterComIdComErro() {
        given(pessoaService.obterComId(10L)).willThrow(new EntityNotFoundException());
        assertThrows(EntityNotFoundException.class, () -> pessoaService.obterComId(10L));
    }
}
