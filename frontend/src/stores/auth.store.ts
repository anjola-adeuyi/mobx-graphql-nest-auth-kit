import { makeAutoObservable } from 'mobx';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../dto/request/login-request.dto';

export class AuthStore {
  private authenticated = false;

  constructor(private readonly authService: AuthService) {
    makeAutoObservable(this);
    this.authenticated = !!this.getAccessToken();
  }

  async login(loginRequest: LoginRequest) {
    try {
      const { access_token } = await this.authService.login(loginRequest);

      console.log({ access_token });

      localStorage.setItem('access_token', access_token);

      this.setAuthenticated(true);
    } catch (error) {
      this.setAuthenticated(false);
      console.error(error);
    }
  }

  private setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }
}
