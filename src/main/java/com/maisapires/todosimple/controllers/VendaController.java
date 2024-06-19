package com.maisapires.todosimple.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.maisapires.todosimple.models.Venda;
import com.maisapires.todosimple.models.dto.VendaCreateDTO;
//import com.maisapires.todosimple.models.dto.VendaUpdateDTO;
import com.maisapires.todosimple.services.VendaService;

@RestController
@RequestMapping("/vendas")
@Validated
public class VendaController {

    @Autowired
    private VendaService vendaService;

    @PostMapping("/{id}")
    public ResponseEntity<Venda> findById(@PathVariable Long id) {
        Venda obj = vendaService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping("/get-all")
    public ResponseEntity<List<Venda>> findAll() {
        List<Venda> vendas = vendaService.findAll();
        return ResponseEntity.ok().body(vendas);
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody VendaCreateDTO obj) {
        Venda newVenda = vendaService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(newVenda.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    
}
