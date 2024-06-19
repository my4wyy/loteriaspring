package com.maisapires.todosimple.controllers;

import java.net.URI;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.maisapires.todosimple.models.Ponto;
import com.maisapires.todosimple.models.dto.PontoCreateDTO;
import com.maisapires.todosimple.services.PontoService;

@RestController
@RequestMapping("/pontos")
@Validated
public class PontoController {

    @Autowired
    private PontoService pontoService;

    @PostMapping("/{id}")
    public ResponseEntity<Ponto> findById(@PathVariable Long id) {
        Ponto obj = pontoService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping("/get-all")
    public ResponseEntity<List<Ponto>> findAll() {
        List<Ponto> pontos = pontoService.findAll();
        return ResponseEntity.ok().body(pontos);
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody PontoCreateDTO obj) {
        Ponto newPonto = pontoService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(newPonto.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/get-by-date-and-user")
    public ResponseEntity<List<Ponto>> findByDateAndUser(@RequestBody Map<String, String> requestData) {
        String dataSelecionada = requestData.get("data");
        Long idFuncionario = Long.parseLong(requestData.get("idFuncionario"));
        List<Ponto> pontos = pontoService.findByDateAndUser(dataSelecionada, idFuncionario);
        return ResponseEntity.ok().body(pontos);
    }

}
