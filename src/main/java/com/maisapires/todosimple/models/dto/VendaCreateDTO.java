package com.maisapires.todosimple.models.dto;

import javax.validation.constraints.NotNull;

import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@Data
public class VendaCreateDTO {

    public Long id;

    private Integer quantidade; 

    @NotNull
    private Long idFuncionario;

    @NotNull
    private Long idProduct; 

    public VendaCreateDTO(Long id, Integer quantidade, @NotNull Long idFuncionario, @NotNull Long idProduct) { 
        this.id = id;
        this.quantidade = quantidade;
        this.idFuncionario = idFuncionario;
        this.idProduct = idProduct; 
    }
}

