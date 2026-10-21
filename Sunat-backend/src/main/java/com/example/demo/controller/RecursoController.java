package com.example.demo.controller;

import com.example.demo.model.RecursoImpugnado;
import com.example.demo.repository.RecursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recursos")
@CrossOrigin(origins = "*")
public class RecursoController {

    @Autowired
    private RecursoRepository recursoRepository;

    @PostMapping("/guardar")
    public ResponseEntity<?> guardarRecurso(@RequestBody RecursoImpugnado recurso) {
        RecursoImpugnado guardado = recursoRepository.save(recurso);
        return ResponseEntity.ok(guardado);
    }
}