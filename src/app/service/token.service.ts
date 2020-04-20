import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly LOCAL_STORAGE_KEY = 'authorization_token';

  constructor() {
  }

  getJwtTokenString(): string | null {
    return window.localStorage.getItem(this.LOCAL_STORAGE_KEY);
  }

  setJwtTokenString(token: string): void {
    window.localStorage.setItem(this.LOCAL_STORAGE_KEY, token);
  }

  clearJwtTokenString(): void {
    window.localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }
}
