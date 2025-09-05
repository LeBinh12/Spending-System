export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  code: number;
  message: string;
  succeeded: boolean;
  data: {
    token: string;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
    password: string;
    email: string;
}

export interface RegisterResponse {
  code: number;
  message: string;
  succeeded: boolean;
    data: string;
}

export interface validateResponse {
    code: number;
  message: string;
  succeeded: boolean;
  data: {
      id: number,
      username: string
  };
}

export interface User {
  id: number;
  username: string;
}


