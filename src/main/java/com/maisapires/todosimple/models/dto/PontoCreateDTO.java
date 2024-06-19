package com.maisapires.todosimple.models.dto;

import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PontoCreateDTO {

    private Long id;

    private LocalDateTime comeco;

    private LocalDateTime fim;

    @NotNull
    private Long idFuncionario;

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

    public Long getIdFuncionario() {
        return idFuncionario;
    }

    public void setIdFuncionario(Long idFuncionario) {
        this.idFuncionario = idFuncionario;
    }
}
