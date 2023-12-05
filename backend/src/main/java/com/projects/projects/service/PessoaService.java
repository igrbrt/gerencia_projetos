package com.projects.projects.service;

import com.projects.projects.dto.PessoaDto;
import com.projects.projects.model.Pessoa;
import com.projects.projects.repository.PessoaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PessoaService {

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private ModelMapper modelMapper;

    public PessoaDto criar(PessoaDto pessoaDto) {
        Pessoa pessoa = modelMapper.map(pessoaDto, Pessoa.class);
        pessoaRepository.save(pessoa);
        return modelMapper.map(pessoa, PessoaDto.class);
    }

    public PessoaDto obterComId(Long id) {
        Pessoa pessoa = pessoaRepository.findById(id).orElse(null);
        if(pessoa == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pessoa não encontrada");
        }
        return modelMapper.map(pessoa, PessoaDto.class);
    }

    public Page<PessoaDto> listar(Pageable pagination) {
        return pessoaRepository
                .findAll(pagination)
                .map(p -> modelMapper.map(p, PessoaDto.class));
    }

    public PessoaDto atualizar(Long id, PessoaDto pessoaDto) {
        Pessoa pessoa = pessoaRepository.findById(id).orElse(null);
        if(pessoa == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pessoa não encontrada");
        }
        modelMapper.map(pessoaDto, pessoa);
        pessoaRepository.save(pessoa);
        return modelMapper.map(pessoa, PessoaDto.class);
    }

    public void deletar(Long id) {
        Pessoa pessoa = pessoaRepository.findById(id).orElse(null);
        if(pessoa == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Pessoa não encontrada");
        }
        pessoaRepository.delete(pessoa);
    }

}
