package com.cognizant.jwt_handson.controller;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.jwt_handson.model.AuthenticationResponse;
import com.cognizant.jwt_handson.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class AuthenticationController {

    @GetMapping("/authenticate")
    public AuthenticationResponse authenticate(HttpServletRequest request) {

        String authorizationHeader = request.getHeader("Authorization");

        String username = "";

        if (authorizationHeader != null && authorizationHeader.startsWith("Basic ")) {

            String base64Credentials = authorizationHeader.substring(6);

            byte[] decodedBytes = Base64.getDecoder().decode(base64Credentials);

            String credentials = new String(decodedBytes, StandardCharsets.UTF_8);

            username = credentials.split(":")[0];
        }

        String token = JwtUtil.generateToken(username);

        return new AuthenticationResponse(token);
    }
}