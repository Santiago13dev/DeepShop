/**
 * Validación de variables de entorno
 * Define el esquema y las reglas de validación para todas las variables de entorno requeridas
 */

import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Configuración general
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  FRONTEND_URL: Joi.string().required(),
  BACKEND_URL: Joi.string().required(),

  // Base de datos
  DATABASE_URL: Joi.string().required(),

  // Supabase
  SUPABASE_URL: Joi.string().uri().required(),
  SUPABASE_ANON_KEY: Joi.string().required(),
  SUPABASE_SERVICE_ROLE_KEY: Joi.string().required(),
  SUPABASE_STORAGE_BUCKET: Joi.string().default('invoices'),

  // Stripe
  STRIPE_PUBLIC_KEY: Joi.string().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
  STRIPE_WEBHOOK_SECRET: Joi.string().required(),
  CURRENCY: Joi.string().default('usd'),

  // Email (SendGrid o SMTP)
  SENDGRID_API_KEY: Joi.string().allow('').optional(),
  EMAIL_FROM: Joi.string().email().required(),
  EMAIL_FROM_NAME: Joi.string().default('Deepshop'),
  
  // SMTP alternativo
  SMTP_HOST: Joi.string().allow('').optional(),
  SMTP_PORT: Joi.number().allow('').optional(),
  SMTP_USER: Joi.string().allow('').optional(),
  SMTP_PASSWORD: Joi.string().allow('').optional(),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),

  // Seguridad
  RATE_LIMIT_TTL: Joi.number().default(60),
  RATE_LIMIT_MAX: Joi.number().default(100),
  CORS_ORIGIN: Joi.string().default('http://localhost:4200'),

  // Pagos y configuración de negocio
  TAX_RATE: Joi.number().default(0.19),
  SHIPPING_COST: Joi.number().default(500),

  // Información de la empresa (para facturas)
  COMPANY_NAME: Joi.string().default('Deepshop Inc.'),
  COMPANY_ADDRESS: Joi.string().default('123 Commerce Street'),
  COMPANY_TAX_ID: Joi.string().default('123456789'),
  COMPANY_PHONE: Joi.string().default('+1-234-567-8900'),
  COMPANY_EMAIL: Joi.string().email().default('info@deepshop.com'),
  COMPANY_WEBSITE: Joi.string().uri().default('https://deepshop.com'),

  // Logging y monitoreo
  LOG_LEVEL: Joi.string()
    .valid('error', 'warn', 'info', 'debug', 'verbose')
    .default('debug'),
  SENTRY_DSN: Joi.string().uri().allow('').optional(),
});
