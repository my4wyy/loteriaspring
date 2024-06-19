package com.maisapires.todosimple.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.maisapires.todosimple.models.Product;
import com.maisapires.todosimple.models.User;
import com.maisapires.todosimple.models.Venda;
import com.maisapires.todosimple.models.dto.VendaCreateDTO;
//import com.maisapires.todosimple.models.dto.VendaUpdateDTO;
import com.maisapires.todosimple.repositories.VendaRepository;
import com.maisapires.todosimple.services.exceptions.DataBindingViolationException;
import com.maisapires.todosimple.services.exceptions.ObjectNotFoundException;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private UserService funcionarioService; 

    @Autowired
    private ProductService produtoService;


    public Venda findById(Long id) {
        Optional<Venda> venda = this.vendaRepository.findById(id);
        return venda.orElseThrow(() -> new ObjectNotFoundException(
                "Venda não encontrada! Id: " + id + ", Tipo: " + Venda.class.getName()));
    }

    public List<Venda> findAll() {
        return vendaRepository.findAll();
    }

    @Transactional
    public Venda create(@Valid VendaCreateDTO obj) {
        Venda venda = fromDTO(obj);
        venda.setId(null);
        return this.vendaRepository.save(venda);
    }

   // public Venda update(VendaUpdateDTO obj, Long id) {
     //   Venda venda = findById(id);
      //  return vendaRepository.save(venda);
   // }

    public void delete(Long id) {
        findById(id);
        try {
            this.vendaRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("Não é possível excluir pois há entidades relacionadas!");
        }
    }

    public Venda fromDTO(@Valid VendaCreateDTO obj) {
        Venda venda = new Venda();
        venda.setQuantidade(obj.getQuantidade());
        
        // Definir o funcionário com base no ID fornecido no DTO
        User funcionario = funcionarioService.findById(obj.getIdFuncionario());
        venda.setFuncionario(funcionario);
        
        // Definir o produto com base no ID fornecido no DTO
        Product produto = produtoService.findById(obj.getIdProduct());
        venda.setProduto(produto);
        
        return venda;
    }
    


}
