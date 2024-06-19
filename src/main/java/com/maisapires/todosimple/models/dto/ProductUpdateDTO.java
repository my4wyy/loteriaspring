package com.maisapires.todosimple.models.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductUpdateDTO {

    public Long id;

    @Size(min = 2, max = 100)
    public String name;

    public Double price;

    public String code;

    public String type;

    public String employeeWhoRegistered;

    public String additionalDetails;

    public Integer quantidade; // Adicionando o campo quantidade
}