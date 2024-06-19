package com.maisapires.todosimple.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SenhaController {

    @PostMapping("/senha")
    public void criarSenha(@RequestBody SenhaDTO senhaDTO) {
        System.out.println("Senha recebida: " + senhaDTO.getSenha());
    }

    @GetMapping("/senha")
    public SenhaDTO obterSenha() {
        SenhaDTO senhaDTO = new SenhaDTO();
        senhaDTO.setSenha("senhaoficial");
        return senhaDTO;
    }

    public static class SenhaDTO {
        private String senha;

        public String getSenha() {
            return senha;
        }

        public void setSenha(String senha) {
            this.senha = senha;
        }
    }
}