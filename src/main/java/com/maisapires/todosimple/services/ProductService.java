package com.maisapires.todosimple.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.maisapires.todosimple.models.Product;
import com.maisapires.todosimple.models.dto.ProductCreateDTO;
import com.maisapires.todosimple.models.dto.ProductUpdateDTO;
import com.maisapires.todosimple.repositories.ProductRepository;
import com.maisapires.todosimple.services.exceptions.DataBindingViolationException;
import com.maisapires.todosimple.services.exceptions.ObjectNotFoundException;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product findById(Long id) {
        Optional<Product> product = this.productRepository.findById(id);
        return product.orElseThrow(() -> new ObjectNotFoundException(
                "Produto não encontrado! Id: " + id + ", Tipo: " + Product.class.getName()));
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Transactional
    public Product create(ProductCreateDTO obj) {
        Product product = fromDTO(obj); 
        product.setId(null); 
        return this.productRepository.save(product);
    }

    public Product update(ProductUpdateDTO obj, Long id) {
        Product product = findById(id);
        product.setName(obj.getName());
        product.setPrice(obj.getPrice());
        product.setCode(obj.getCode());
        product.setType(obj.getType());
        product.setEmployeeWhoRegistered(obj.getEmployeeWhoRegistered());
        product.setAdditionalDetails(obj.getAdditionalDetails());
        product.setQuantidade(obj.getQuantidade());
        return productRepository.save(product);
    }

    public void delete(Long id) {
        findById(id); 
        try {
            this.productRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("Não é possível excluir pois há entidades relacionadas!");
        }
    }

   
    public Product fromDTO(@Valid ProductCreateDTO obj) {
        Product product = new Product();
        product.setName(obj.getName());
        product.setPrice(obj.getPrice());
        product.setCode(obj.getCode());
        product.setType(obj.getType());
        product.setEmployeeWhoRegistered(obj.getEmployeeWhoRegistered());
        product.setAdditionalDetails(obj.getAdditionalDetails());
        product.setQuantidade(obj.getQuantidade()); // Definindo a quantidade
        return product;
    }

    // Método para converter ProductUpdateDTO para Product
    public Product fromDTO(@Valid ProductUpdateDTO obj) {
        Product product = new Product();
        product.setId(obj.getId()); // Define o ID do produto a ser atualizado
        product.setName(obj.getName());
        product.setPrice(obj.getPrice());
        product.setCode(obj.getCode());
        product.setType(obj.getType());
        product.setEmployeeWhoRegistered(obj.getEmployeeWhoRegistered());
        product.setAdditionalDetails(obj.getAdditionalDetails());
        product.setQuantidade(obj.getQuantidade()); // Definindo a quantidade
        return product;
    }

}
