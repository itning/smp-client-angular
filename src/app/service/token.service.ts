import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly LOCAL_STORAGE_KEY = 'authorization_token';

  constructor() {
  }

  getJwtTokenString(): string | null {
    //  return window.localStorage.getItem(this.LOCAL_STORAGE_KEY);
    return 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1ODcyMjI4OTcsImxvZ2luVXNlciI6IntcIm5hbWVcIjpcImFcIixcInVzZXJuYW1lXCI6XCJhXCIsXCJyb2xlXCI6e1wiaWRcIjpcIjNcIixcIm5hbWVcIjpcIui-heWvvOWRmFwiLFwiZ210Q3JlYXRlXCI6MTU3OTU5NDkzMDU2MixcImdtdE1vZGlmaWVkXCI6MTU3OTU5NDkzMDU2Mn0sXCJlbWFpbFwiOlwiYVwiLFwidGVsXCI6XCIxXCJ9IiwiaXNzIjoiaXRuaW5nIn0.7qPhotIcXgcqd3ImJ8Xc77_hLYrNdE7kWParXkYLKNs';
  }

  setJwtTokenString(token: string): void {
    window.localStorage.setItem(this.LOCAL_STORAGE_KEY, token);
  }
}
