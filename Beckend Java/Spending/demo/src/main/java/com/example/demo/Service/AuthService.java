package com.example.demo.Service;

import com.example.demo.Config.JwtUtil;
import com.example.demo.Dto.Response.UserInfoResponse;
import com.example.demo.Entity.User;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Dto.Request.LoginRequest;
import com.example.demo.Dto.Request.RegisterRequest;
import com.example.demo.Dto.Response.AuthResponse;
import com.example.demo.Shared.ApiResponse;
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

    public ApiResponse<String> Register(RegisterRequest request){
        if(userRepository.existsByUsername(request.getUsername())){
            return ApiResponse.error("Username này đã tồn tại", 400);
        }
        if(userRepository.existsByEmail(request.getEmail())){
            return ApiResponse.error("Email này đã tồn tại", 400);
        }

        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .email(request.getEmail())
                .role("USER")
                .build();

        userRepository.save(user);
        return ApiResponse.success("User registered successfully!", "Đăng ký thành công");
    }

    public ApiResponse<AuthResponse> login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Người đùng không tồn tại"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            return ApiResponse.error("Thông tin xác thực không hợp lệ", 401);
        }

        String token = jwtUtil.generateToken(user.getUsername());
        return ApiResponse.success(new AuthResponse(token), "Đăng nhập thành công");
    }

    public ApiResponse<UserInfoResponse> validate(String token) {
        if(!jwtUtil.validateToken(token)) {
            return ApiResponse.error("Thông tin đăng nhập không hợp lệ", 401);
        }

        String name = jwtUtil.extractUsername(token);
        User user = userRepository.findByUsername(name)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));

        return ApiResponse.success(
                new UserInfoResponse(user.getId(), user.getUsername()),
                "Token hợp lệ"
        );    }
}
