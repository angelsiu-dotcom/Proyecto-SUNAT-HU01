package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "recursos_registrados")
public class RecursoImpugnado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ruc;
    private String materia;
    private String tipoRecurso;
    private String actoImpugnado;

    @Column(columnDefinition = "TEXT")
    private String sustento;

    public RecursoImpugnado() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getRuc() { return ruc; }
    public void setRuc(String ruc) { this.ruc = ruc; }

    public String getMateria() { return materia; }
    public void setMateria(String materia) { this.materia = materia; }

    public String getTipoRecurso() { return tipoRecurso; }
    public void setTipoRecurso(String tipoRecurso) { this.tipoRecurso = tipoRecurso; }

    public String getActoImpugnado() { return actoImpugnado; }
    public void setActoImpugnado(String actoImpugnado) { this.actoImpugnado = actoImpugnado; }

    public String getSustento() { return sustento; }
    public void setSustento(String sustento) { this.sustento = sustento; }
}