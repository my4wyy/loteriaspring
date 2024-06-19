package com.maisapires.todosimple.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    @NotBlank
    @Size(max = 100)
    private String name;

    @Column(name = "price", nullable = false)
    @NotNull
    private Double price;

    @Column(name = "code", nullable = false, unique = true)
    @NotBlank
    private String code;

    @Column(name = "type", nullable = false)
    @NotBlank
    private String type;

    @Column(name = "additional_details", length = 255)
    @Size(max = 255)
    private String additionalDetails;

    @Column(name = "employee_who_registered", nullable = false)
    @NotBlank
    private String employeeWhoRegistered;

    @Column(name = "quantidade")
    private Integer quantidade; 
}
