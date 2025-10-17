/**
 * Módulo raíz de la aplicación Deepshop Backend
 * Importa y configura todos los módulos principales
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

// Importar módulos personalizados
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { UsersModule } from './modules/users/users.module';
import { AdminModule } from './modules/admin/admin.module';
import { EmailModule } from './common/email/email.module';
import { StorageModule } from './common/storage/storage.module';
import { HealthModule } from './modules/health/health.module';

// Configuración de validación de variables de entorno
import { validationSchema } from './config/env.validation';

@Module({
  imports: [
    // Configuración global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),

    // Rate limiting (protección contra ataques de fuerza bruta)
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 segundos
        limit: 100, // 100 peticiones por minuto
      },
    ]),

    // Programación de tareas (cron jobs)
    ScheduleModule.forRoot(),

    // Módulos core
    PrismaModule,
    EmailModule,
    StorageModule,

    // Módulos de funcionalidades
    HealthModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
    InvoicesModule,
    ReviewsModule,
    UsersModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
