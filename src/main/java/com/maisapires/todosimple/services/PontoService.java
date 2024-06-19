package com.maisapires.todosimple.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maisapires.todosimple.models.Ponto;
import com.maisapires.todosimple.models.User;
import com.maisapires.todosimple.models.dto.PontoCreateDTO;
import com.maisapires.todosimple.repositories.PontoRepository;
import com.maisapires.todosimple.repositories.UserRepository;
import com.maisapires.todosimple.services.exceptions.ObjectNotFoundException;

@Service
public class PontoService {

    @Autowired
    private PontoRepository pontoRepository;

    @Autowired
    private UserRepository userRepository;

    public Ponto findById(Long id) {
        Optional<Ponto> ponto = this.pontoRepository.findById(id);
        return ponto.orElseThrow(() -> new ObjectNotFoundException(
                "Ponto não encontrado! Id: " + id + ", Tipo: " + Ponto.class.getName()));
    }

    public List<Ponto> findAll() {
        return pontoRepository.findAll();
    }

    @Transactional
    public Ponto create(PontoCreateDTO obj) {
        Ponto ponto = fromDTO(obj); 
        User funcionario = userRepository.findById(obj.getIdFuncionario())
                .orElseThrow(() -> new ObjectNotFoundException(
                        "Funcionário não encontrado! Id: " + obj.getIdFuncionario() + ", Tipo: " + User.class.getName()));
        ponto.setFuncionario(funcionario); 
        return this.pontoRepository.save(ponto);
    }

    
    public Ponto fromDTO(@Valid PontoCreateDTO obj) {
        Ponto ponto = new Ponto();
        ponto.setComeco(obj.getComeco());
        ponto.setFim(obj.getFim());
        return ponto;
    }
    public List<Ponto> findByDateAndUser(String dataSelecionada, Long idFuncionario) {
        // Converter a data selecionada para LocalDate
        LocalDate data = LocalDate.parse(dataSelecionada);

        // Buscar os pontos por data e ID do funcionário no repositório
        return pontoRepository.findByDateAndUserId(data, idFuncionario);
    }
}
