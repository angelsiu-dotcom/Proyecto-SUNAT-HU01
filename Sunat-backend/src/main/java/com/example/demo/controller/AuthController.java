package com.example.demo.controller;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        System.out.println("--- INTENTO DE LOGIN ---");
        System.out.println("Usuario recibido: [" + request.getUsuario() + "]");
        System.out.println("RUC recibido: [" + request.getRuc() + "]");
        System.out.println("Password recibido: [" + request.getPassword() + "]");

        Optional<Usuario> userOpt = usuarioRepository.findByUsuario(request.getUsuario());

        if (userOpt.isPresent()) {
            Usuario user = userOpt.get();
            System.out.println("Usuario encontrado en Neon: " + user.getUsuario());
            System.out.println("Password en BD: [" + user.getPassword() + "]");

            if (user.getPassword().equals(request.getPassword()) && user.getRuc().equals(request.getRuc())) {
                System.out.println("¡Credenciales correctas!");
                String tokenSimulado = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.sunat." + user.getUsuario();
                AuthResponse response = new AuthResponse(
                    tokenSimulado,
                    user.getRuc(),
                    user.getUsuario(),
                    user.getNombreORazonSocial(),
                    user.getPerfil()
                );
                return ResponseEntity.ok(response);
            } else {
                System.out.println("ERROR: La contraseña o el RUC no coinciden.");
            }
        } else {
            System.out.println("ERROR: El usuario no existe en la base de datos.");
        }

        return ResponseEntity.status(401).body("Credenciales incorrectas");
    }
}