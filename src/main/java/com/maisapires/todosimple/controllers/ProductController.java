package com.maisapires.todosimple.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.maisapires.todosimple.models.Product;
import com.maisapires.todosimple.models.dto.ProductCreateDTO;
import com.maisapires.todosimple.models.dto.ProductUpdateDTO;
import com.maisapires.todosimple.services.ProductService;

@RestController
@RequestMapping("/products")
@Validated
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id) {
        Product obj = productService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping("/get-all")
    public ResponseEntity<List<Product>> findAll() {
        List<Product> products = productService.findAll();
        return ResponseEntity.ok().body(products);
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody ProductCreateDTO obj) {
        Product newProduct = productService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(newProduct.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/update")
    public ResponseEntity<Product> update(@Valid @RequestBody ProductUpdateDTO obj) {
        productService.update(obj, obj.id);
        Product objResponse = productService.findById(obj.id);
        return ResponseEntity.ok().body(objResponse);
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> delete(@Valid @RequestBody ProductUpdateDTO obj) {
        productService.delete(obj.id);
        return ResponseEntity.noContent().build();
    }
}
