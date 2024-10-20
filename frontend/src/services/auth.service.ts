import { LoginRequest } from '../dto/request/login-request.dto';
import { API_URL } from '../utils/url';

export class AuthService {
  async login(loginRequest: LoginRequest) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }
}
