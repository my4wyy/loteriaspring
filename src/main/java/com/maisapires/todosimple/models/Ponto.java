package com.maisapires.todosimple.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "ponto")
public class Ponto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "comeco", nullable = true)
    private LocalDateTime comeco;

    @Column(name = "fim", nullable = true)
    private LocalDateTime fim;


    @ManyToOne
    @JoinColumn(name = "id_funcionario", nullable = false, foreignKey = @ForeignKey(name = "FK_ponto_funcionario"))
    private User funcionario;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getComeco() {
        return comeco;
    }

    public void setComeco(LocalDateTime comeco) {
        this.comeco = comeco;
    }

    public LocalDateTime getFim() {
        return fim;
    }

    public void setFim(LocalDateTime fim) {
        this.fim = fim;
    }

    public User getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(User funcionario) {
        this.funcionario = funcionario;
    }

}
