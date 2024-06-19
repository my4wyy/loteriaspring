package com.maisapires.todosimple.repositories;

import com.maisapires.todosimple.models.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PontoRepository extends JpaRepository<Ponto, Long> {

    @Query("SELECT p FROM Ponto p WHERE DATE(p.comeco) = :data AND p.funcionario.id = :idFuncionario")
    List<Ponto> findByDateAndUserId(@Param("data") LocalDate data, @Param("idFuncionario") Long idFuncionario);
}
