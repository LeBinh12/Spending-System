package com.example.demo.Controller;

import com.example.demo.Dto.Request.LoginRequest;
import com.example.demo.Dto.Request.RegisterRequest;
import com.example.demo.Dto.Response.AuthResponse;
import com.example.demo.Dto.Response.UserInfoResponse;
import com.example.demo.Service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenController {
    private final AuthService authService;

    public AuthenController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.Register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }

    @GetMapping("/validate")
    public ResponseEntity<UserInfoResponse> validate(@RequestParam String token) {
        return ResponseEntity.ok(authService.validate(token));
    }
}
