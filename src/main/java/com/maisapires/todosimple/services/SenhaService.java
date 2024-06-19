package com.maisapires.todosimple.services;


import org.springframework.stereotype.Service;

@Service
public class SenhaService {
    
    public boolean verificarSenha(String senha) {
        return senha.equals("senhaoficial");
    }
}

