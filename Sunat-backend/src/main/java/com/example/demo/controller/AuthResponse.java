package com.example.demo.controller;

public class AuthResponse {
    private String token;
    private String ruc;
    private String usuario;
    private String nombreORazonSocial;
    private String perfil;

    public AuthResponse(String token, String ruc, String usuario, String nombreORazonSocial, String perfil) {
        this.token = token;
        this.ruc = ruc;
        this.usuario = usuario;
        this.nombreORazonSocial = nombreORazonSocial;
        this.perfil = perfil;
    }

    public String getToken() { return token; }
    public String getRuc() { return ruc; }
    public String getUsuario() { return usuario; }
    public String getNombreORazonSocial() { return nombreORazonSocial; }
    public String getPerfil() { return perfil; }
}