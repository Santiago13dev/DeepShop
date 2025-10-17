/**
 * MÓDULO DE AUTENTICACIÓN - DEEPSHOP
 * Gestiona registro, login y autenticación con Supabase
 */

import { Module, Injectable, Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PrismaService } from '../../common/prisma/prisma.service';
import { EmailService } from '../../common/email/email.service';

// ========================================
// DTOs
// ========================================

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

// ========================================
// SERVICIO DE AUTENTICACIÓN
// ========================================

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_ANON_KEY')!,
    );
  }

  /**
   * Registrar nuevo usuario
   */
  async register(dto: RegisterDto) {
    // Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await this.supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
    });

    if (authError) {
      throw new Error(authError.message);
    }

    // Crear perfil en la base de datos
    const profile = await this.prisma.profile.create({
      data: {
        id: authData.user!.id,
        email: dto.email,
        firstName: dto.firstName,
        lastName: dto.lastName,
        role: 'CUSTOMER',
      },
    });

    // Enviar email de bienvenida
    await this.emailService.sendAccountConfirmation(
      dto.email,
      `${dto.firstName} ${dto.lastName}`,
    );

    return {
      user: profile,
      session: authData.session,
    };
  }

  /**
   * Iniciar sesión
   */
  async login(dto: LoginDto) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Obtener perfil del usuario
    const profile = await this.prisma.profile.findUnique({
      where: { id: data.user.id },
    });

    return {
      user: profile,
      session: data.session,
    };
  }

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(userId: string) {
    return this.prisma.profile.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
      },
    });
  }

  /**
   * Cerrar sesión
   */
  async logout(accessToken: string) {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    return { message: 'Sesión cerrada exitosamente' };
  }

  /**
   * Solicitar restablecimiento de contraseña
   */
  async requestPasswordReset(email: string) {
    const { error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${this.configService.get('FRONTEND_URL')}/auth/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Email de recuperación enviado' };
  }
}

// ========================================
// CONTROLADOR DE AUTENTICACIÓN
// ========================================

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiBearerAuth('JWT-auth')
  logout(@Request() req: any) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    return this.authService.logout(token);
  }

  @Get('me')
  @ApiOperation({ summary: 'Obtener usuario actual' })
  @ApiBearerAuth('JWT-auth')
  getCurrentUser(@Request() req: any) {
    return this.authService.getCurrentUser(req.user.id);
  }

  @Post('password-reset')
  @ApiOperation({ summary: 'Solicitar restablecimiento de contraseña' })
  requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }
}

// ========================================
// MÓDULO DE AUTENTICACIÓN
// ========================================

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
