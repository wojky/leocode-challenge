import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService, JwtTokenResponse, LoginCredentials } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TokenPayload } from './auth/jwt.strategy';
import { Request } from 'express';
import { CryptoService, Keys } from './crypto/crypto.service';

@Controller('api/')
export class AppController {
  constructor(private readonly authService: AuthService, private readonly cryptoService: CryptoService) {}

  @Post('sign-in')
  async signIn(@Body() body: LoginCredentials): Promise<JwtTokenResponse> {
    return this.authService.handleSignInRequest(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('generate-key-pair')
  async generateKeyPair(@Req() req: Request & {user: TokenPayload}): Promise<Keys> {
    return this.cryptoService.handleGenerateKeysRequest(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('encrypt')
  async encrypt(@Req() req: Request & {user: TokenPayload}): Promise<any> {
    return this.cryptoService.handleEncryptRequest(req.user.userId);
  }
}
