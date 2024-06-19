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
public class ProductCreateDTO {

    public Long id;

    @NotBlank
    @Size(min = 2, max = 100)
    private String name;

    @NotNull
    private Double price;

    @NotBlank
    private String code;

    @NotBlank
    private String type;

    @NotBlank
    private String employeeWhoRegistered;

    private String additionalDetails;

    private Integer quantidade; 
}
