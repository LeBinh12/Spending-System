package com.example.demo.Service;

import com.example.demo.Config.JwtUtil;
import com.example.demo.Dto.Response.UserInfoResponse;
import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Dto.Request.LoginRequest;
import com.example.demo.Dto.Request.RegisterRequest;
import com.example.demo.Dto.Response.AuthResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public String Register(RegisterRequest request){
        if(userRepository.existsByUsername(request.getUsername())){
            throw new RuntimeException("Username này đã tồn tại");
        }
        if(userRepository.existsByEmail(request.getEmail())){
            throw new RuntimeException("Email này đã tồn tại");
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role("USER")
                .build();

        userRepository.save(user);
        return "User registered successfully!";
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Người đùng không tồn tại"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Thông ti xác thực không hợp lệ");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return new AuthResponse(token);
    }

    public UserInfoResponse validate(String token) {
        if(!jwtUtil.validateToken(token)) {
            throw new RuntimeException("Thông tin đăng nhập không hợp lệ");
        }

        String name = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        return new UserInfoResponse(user.getId(), user.getUsername());
    }
}
