import { Injectable, UnauthorizedException } from '@nestjs/common';
import { storage, User } from 'src/storage/storage-mock';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface JwtTokenResponse {
  authToken: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public async handleSignInRequest(credentials: LoginCredentials): Promise<JwtTokenResponse> {
    const user = await this.validateUser(credentials);

    if (!user) {
       throw new UnauthorizedException();
    }

    return this.login(user);
  }

  public async validateUser(credentials: LoginCredentials): Promise<User | null> {
    const user = await storage.query({email: credentials.email});

    if (!user) {
      return null;
    }

    return await bcrypt.compare(credentials.password, user.password) 
      ? user 
      : null;
  }

  public login(user: User): JwtTokenResponse {
    const payload = { email: user.email, userId: user.id };
    return {
      authToken: this.jwtService.sign(payload),
    };
  }
}
