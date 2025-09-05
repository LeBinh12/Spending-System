package com.example.demo.Controller;

import com.example.demo.Dto.Request.LoginRequest;
import com.example.demo.Dto.Request.RegisterRequest;
import com.example.demo.Dto.Response.AuthResponse;
import com.example.demo.Dto.Response.UserInfoResponse;
import com.example.demo.Service.AuthService;
import com.example.demo.Shared.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenController {
    private final AuthService authService;

    public AuthenController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<String>> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.Register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }

    @GetMapping("/validate")
    public ResponseEntity<ApiResponse<UserInfoResponse>> validate(@RequestParam String token) {
        return ResponseEntity.ok(authService.validate(token));
    }
}
