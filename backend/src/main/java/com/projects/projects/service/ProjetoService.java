package com.projects.projects.service;

import com.projects.projects.dto.ProjetoDto;
import com.projects.projects.model.Pessoa;
import com.projects.projects.model.Projeto;
import com.projects.projects.model.Status;
import com.projects.projects.repository.PessoaRepository;
import com.projects.projects.repository.ProjetoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;

@Service
public class ProjetoService {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private PessoaRepository pessoaRepository;

    @Autowired
    private ModelMapper modelMapper;

    public ProjetoDto criar(ProjetoDto projetoDto) {
        Projeto projeto = modelMapper.map(projetoDto, Projeto.class);
        projetoRepository.save(projeto);
        return modelMapper.map(projeto, ProjetoDto.class);
    }

    public ProjetoDto obterComId(Long id) {
        Projeto projeto = projetoRepository.findById(id).orElse(null);
        if(projeto == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Projeto não encontrado");
        }
        return modelMapper.map(projeto, ProjetoDto.class);
    }

    public Page<ProjetoDto> listar(Pageable pagination) {
        return projetoRepository
                .findAll(pagination)
                .map(p -> modelMapper.map(p, ProjetoDto.class));
    }

    public ProjetoDto atualizar(Long id, ProjetoDto projetoDto) {
        Projeto projeto = projetoRepository.findById(id).orElse(null);
        if(projeto == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Projeto não encontrado");
        }

        modelMapper.map(projetoDto, projeto);
        projetoRepository.save(projeto);
        return modelMapper.map(projeto, ProjetoDto .class);
    }

    public void deletar(Long id) {
        Projeto projeto = projetoRepository.findById(id).orElse(null);
        if(projeto == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Projeto não encontrado");
        }
        if(Set.of(Status.INICIADO, Status.EM_ANDAMENTO,Status.ENCERRADO).contains(projeto.getStatus())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Não é possível deletar um projeto com status INICIADO, EM ANDAMENTO ou ENCERRADO");
        }
        projetoRepository.deleteById(id);
    }

    public String adicionarMembrosProjeto(Long idProjeto, List<ProjetoDto> membros) {
        Projeto projeto = projetoRepository.findById(idProjeto).orElse(null);
        if(projeto == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Projeto não encontrado");
        }
        for (ProjetoDto membro : membros) {
            Pessoa pessoa = pessoaRepository.findById(membro.getId()).orElseThrow(EntityNotFoundException::new);
            if(pessoa.getProjetos().stream().anyMatch(p -> p.getId().equals(idProjeto))){
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, pessoa.getNome() + " já está no projeto");
            }
            if(!pessoa.getFuncionario()){
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, pessoa.getNome() + " não é funcionário");
            }
            projeto.getMembros().add(pessoa);
            System.out.println(pessoa.getNome());
        }
        projetoRepository.save(projeto);
        return "Membros adicionados ao projeto com sucesso!";
    }
}
