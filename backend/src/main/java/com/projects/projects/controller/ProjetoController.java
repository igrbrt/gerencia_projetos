package com.projects.projects.controller;

import com.projects.projects.dto.ProjetoDto;
import com.projects.projects.model.Wrapper;
import com.projects.projects.service.ProjetoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/projetos")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjetoController {

    @Autowired
    private ProjetoService projetoService;

    @Operation(summary = "Listar projetos")
    @ApiResponse(responseCode="200", description = "Listagem de projetos")
    @GetMapping
    public Page<ProjetoDto> listar(@PageableDefault(size = 10) Pageable pagination) {
        return projetoService.listar(pagination);
    }

    @Operation(summary = "Obter projeto por id")
    @ApiResponses(value = {
            @ApiResponse(responseCode="200", description = "Obter projeto por id"),
            @ApiResponse(responseCode="404", description = "Projeto não encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProjetoDto> obterComId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(projetoService.obterComId(id));
    }

    @Operation(summary = "Criar projeto")
    @ApiResponses(value = {
            @ApiResponse(responseCode="201", description = "Projeto criado"),
            @ApiResponse(responseCode="400", description = "Dados inválidos")
    })
    @PostMapping
    public ResponseEntity<ProjetoDto> criar(@RequestBody ProjetoDto projetoDto, UriComponentsBuilder uriBuilder) {
        ProjetoDto projeto = projetoService.criar(projetoDto);
        URI address = uriBuilder
                .path("/projeto/{id}")
                .buildAndExpand(projeto.getId())
                .toUri();
        return ResponseEntity.created(address).body(projeto);
    }

    @Operation(summary = "Atualizar projeto")
    @ApiResponses(value = {
            @ApiResponse(responseCode="200", description = "Projeto atualizado"),
            @ApiResponse(responseCode="400", description = "Dados inválidos"),
            @ApiResponse(responseCode="404", description = "Projeto não encontrado")
    })
    @PatchMapping("/{id}")
    public ResponseEntity<ProjetoDto> atualizar(@PathVariable @NotNull Long id, @RequestBody @Valid ProjetoDto projetoDto) {
        return ResponseEntity.ok(projetoService.atualizar(id, projetoDto));
    }

    @Operation(summary = "Deletar projeto")
    @ApiResponses(value = {
            @ApiResponse(responseCode="204", description = "Projeto deletado"),
            @ApiResponse(responseCode="404", description = "Projeto não encontrado"),
            @ApiResponse(responseCode="403", description = "Não é possível deletar um projeto com status INICIADO, EM ANDAMENTO ou ENCERRADO")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<ProjetoDto> deletar(@PathVariable @NotNull Long id) {
        projetoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Adicionar membros ao projeto")
    @ApiResponses(value = {
            @ApiResponse(responseCode="200", description = "Membros adicionados"),
            @ApiResponse(responseCode="404", description = "Projeto não encontrado"),
            @ApiResponse(responseCode="403", description = "Membro não é funcionário"),
            @ApiResponse(responseCode="500", description = "Membro já está no projeto"),
    })
    @PostMapping(path = "/{idProjeto}/add-membros")
    public ResponseEntity<String> adicionarMembros(@PathVariable @NotNull Long idProjeto, @RequestBody @Valid Wrapper<ProjetoDto> membros) {
        List<ProjetoDto> pessoas = membros.getData();
        return ResponseEntity.ok(projetoService.adicionarMembrosProjeto(idProjeto, pessoas));
    }
}
