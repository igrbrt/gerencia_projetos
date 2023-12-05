package com.projects.projects.controller;

import com.projects.projects.dto.PessoaDto;
import com.projects.projects.service.PessoaService;
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

@RestController
@RequestMapping("/pessoas")
@CrossOrigin(origins = "http://localhost:3000")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @Operation(summary = "Listar pessoas")
    @ApiResponse(responseCode="200", description = "Listagem de pessoas")
    @GetMapping
    public Page<PessoaDto> listar(@PageableDefault(size = 10) Pageable pagination) {
        return pessoaService.listar(pagination);
    }

    @Operation(summary = "Obter pessoa por id")
    @ApiResponses(value = {
            @ApiResponse(responseCode="200", description = "Obter pessoa por id"),
            @ApiResponse(responseCode="404", description = "Pessoa não encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<PessoaDto> obterComId(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(pessoaService.obterComId(id));
    }

    @Operation(summary = "Criar pessoa")
    @ApiResponses(value = {
            @ApiResponse(responseCode="201", description = "Pessoa criada"),
            @ApiResponse(responseCode="400", description = "Dados inválidos")
    })
    @PostMapping
    public ResponseEntity<PessoaDto> criar(@RequestBody @Valid PessoaDto pessoaDto, UriComponentsBuilder uriBuilder){
        PessoaDto pessoa = pessoaService.criar(pessoaDto);
        URI address = uriBuilder
                .path("/pessoa/{id}")
                .buildAndExpand(pessoa.getId())
                .toUri();
        return ResponseEntity.created(address).body(pessoa);
    }

    @Operation(summary = "Atualizar pessoa")
    @ApiResponses(value = {
            @ApiResponse(responseCode="200", description = "Pessoa atualizada"),
            @ApiResponse(responseCode="400", description = "Dados inválidos"),
            @ApiResponse(responseCode="404", description = "Pessoa não encontrada")
    })
    @PatchMapping("/{id}")
    public ResponseEntity<PessoaDto> atualizar(@PathVariable @NotNull Long id, @RequestBody @Valid PessoaDto pessoaDto){
        return ResponseEntity.ok(pessoaService.atualizar(id, pessoaDto));
    }

    @Operation(summary = "Deletar pessoa")
    @ApiResponses(value = {
            @ApiResponse(responseCode="204", description = "Pessoa deletada"),
            @ApiResponse(responseCode="404", description = "Pessoa não encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<PessoaDto> deletar(@PathVariable @NotNull Long id){
        pessoaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
