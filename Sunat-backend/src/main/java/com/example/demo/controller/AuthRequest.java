package com.example.demo.controller;

public class AuthRequest {
    private String ruc;
    private String usuario;
    private String password;

    public AuthRequest() {}

    public String getRuc() { return ruc; }
    public void setRuc(String ruc) { this.ruc = ruc; }

    public String getUsuario() { return usuario; }
    public void setUsuario(String usuario) { this.usuario = usuario; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}