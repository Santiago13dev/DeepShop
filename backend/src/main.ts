/**
 * Punto de entrada principal de la aplicación Deepshop Backend
 * Configura y arranca el servidor NestJS con todas las configuraciones necesarias
 */

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  // Crear la aplicación NestJS
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Configurar prefijo global de la API
  app.setGlobalPrefix('api');

  // Configurar CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Configurar Helmet para seguridad (headers HTTP seguros)
  app.use(helmet());

  // Habilitar compresión de respuestas
  app.use(compression());

  // Configurar pipes de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
      transform: true, // Transforma los tipos automáticamente
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configurar Swagger para documentación de API
  const config = new DocumentBuilder()
    .setTitle('Deepshop API')
    .setDescription('API REST completa para la plataforma de e-commerce Deepshop')
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticación y registro')
    .addTag('products', 'Gestión de productos')
    .addTag('categories', 'Gestión de categorías')
    .addTag('cart', 'Carrito de compras')
    .addTag('orders', 'Gestión de pedidos')
    .addTag('payments', 'Procesamiento de pagos con Stripe')
    .addTag('invoices', 'Generación y gestión de facturas')
    .addTag('reviews', 'Reseñas de productos')
    .addTag('admin', 'Panel de administración')
    .addTag('users', 'Gestión de usuarios')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Token JWT de Supabase',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Deepshop API Docs',
    customfavIcon: 'https://deepshop.com/favicon.ico',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  // Obtener el puerto desde variables de entorno
  const port = process.env.PORT || 3000;

  // Iniciar el servidor
  await app.listen(port);

  console.log(`
  ╔═══════════════════════════════════════════════════════════╗
  ║                                                           ║
  ║   🛍️  DEEPSHOP BACKEND API                                ║
  ║                                                           ║
  ║   🚀 Servidor corriendo en: http://localhost:${port}       ║
  ║   📚 Documentación API: http://localhost:${port}/api/docs ║
  ║   🔧 Ambiente: ${process.env.NODE_ENV || 'development'}                      ║
  ║                                                           ║
  ╚═══════════════════════════════════════════════════════════╝
  `);
}

// Ejecutar la aplicación
bootstrap().catch((error) => {
  console.error('Error al iniciar la aplicación:', error);
  process.exit(1);
});
