package com.maisapires.todosimple.models;

import java.util.Optional;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.ForeignKey; 

@Entity
@Table(name = "venda")
@NoArgsConstructor
@Data
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_funcionario", nullable = false, foreignKey = @ForeignKey(name = "FK_venda_funcionario"))
    private User funcionario;

    @Column(name = "quantidade")
    private Integer quantidade; 

    @ManyToOne
    @JoinColumn(name = "id_product", nullable = false, foreignKey = @ForeignKey(name = "FK_venda_produto"))
    private Product produto;

    public Venda(Long id, User funcionario, Integer quantidade, Product produto) {
        this.id = id;
        this.funcionario = funcionario;
        this.quantidade = quantidade;
        this.produto = produto;
    }
}
