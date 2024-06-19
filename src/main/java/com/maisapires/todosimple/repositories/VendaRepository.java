package com.maisapires.todosimple.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.maisapires.todosimple.models.Venda;

@Repository
public interface VendaRepository extends JpaRepository<Venda, Long> {

}
