package com.maisapires.todosimple.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.maisapires.todosimple.models.Senha;

@Repository
public interface SenhaRepository extends JpaRepository<Senha, Long> {
    
}
