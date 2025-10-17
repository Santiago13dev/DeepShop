# 🛍️ DEEPSHOP - E-commerce Completo y Profesional

![Deepshop Banner](https://via.placeholder.com/1200x300/6366f1/ffffff?text=DEEPSHOP+-+E-commerce+Moderno)

## 📋 Descripción

**Deepshop** es una plataforma de e-commerce completa y profesional construida con las últimas tecnologías web. Incluye gestión de productos, carrito de compras, procesamiento de pagos con Stripe, facturación automática en PDF, y un panel de administración completo.

## 🛠️ Stack Tecnológico

### Frontend
- **Angular 17+** - Framework principal
- **TypeScript** - Lenguaje de programación
- **TailwindCSS** - Framework de estilos
- **Angular Animations** - Animaciones fluidas
- **Supabase JS** - Cliente para Auth y Storage

### Backend
- **Node.js 20+** - Runtime
- **NestJS** - Framework backend
- **TypeScript** - Lenguaje de programación
- **Prisma** - ORM para base de datos
- **Swagger** - Documentación de API

### Infraestructura
- **Supabase** - Auth, Database (PostgreSQL), Storage
- **Stripe** - Procesamiento de pagos
- **SendGrid** - Envío de correos
- **Docker** - Contenedorización
- **GitHub Actions** - CI/CD

### Testing
- **Jest** - Tests unitarios
- **Playwright** - Tests E2E
- **ESLint + Prettier** - Linting y formateo

## 📁 Estructura del Proyecto

```
deepshop/
├── frontend/                 # Aplicación Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/        # Servicios core, guards, interceptors
│   │   │   ├── shared/      # Componentes, pipes, directivas compartidas
│   │   │   ├── features/    # Módulos de funcionalidades
│   │   │   │   ├── shop/
│   │   │   │   ├── product/
│   │   │   │   ├── cart/
│   │   │   │   ├── auth/
│   │   │   │   ├── account/
│   │   │   │   └── admin/
│   │   │   └── layouts/     # Layouts principales
│   │   ├── assets/
│   │   └── environments/
│   ├── Dockerfile
│   └── package.json
│
├── backend/                  # API NestJS
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── products/
│   │   │   ├── orders/
│   │   │   ├── payments/
│   │   │   ├── invoices/
│   │   │   └── admin/
│   │   ├── common/
│   │   ├── config/
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── Dockerfile
│   └── package.json
│
├── database/                 # Scripts SQL y migraciones
│   └── init.sql
│
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 20+ y npm
- Docker y Docker Compose
- Cuenta en Supabase
- Cuenta en Stripe (modo test)
- Cuenta en SendGrid (opcional)

### 1. Configuración de Supabase

1. Crea un nuevo proyecto en [Supabase](https://supabase.com)
2. Ve a Settings → API y copia:
   - `Project URL`
   - `anon public key`
   - `service_role key`
3. Ve a Settings → Database y copia la `Connection String`
4. Habilita Email Auth en Authentication → Providers
5. Crea un bucket público llamado `invoices` en Storage

### 2. Configuración de Stripe

1. Crea una cuenta en [Stripe](https://stripe.com)
2. Ve a Developers → API keys y copia:
   - `Publishable key`
   - `Secret key`
3. Configura un webhook endpoint apuntando a `http://tu-dominio/api/payments/webhook`
4. Copia el `Webhook signing secret`

### 3. Configuración de SendGrid

1. Crea una cuenta en [SendGrid](https://sendgrid.com)
2. Crea una API Key
3. Verifica tu dominio de envío

### 4. Variables de Entorno

Copia el archivo `.env.example` a `.env` y completa todas las variables:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales.

### 5. Instalación y Ejecución

#### Opción A: Con Docker (Recomendado)

```bash
# Construir e iniciar todos los servicios
docker-compose up --build

# Frontend: http://localhost:4200
# Backend: http://localhost:3000
# API Docs: http://localhost:3000/api/docs
```

#### Opción B: Sin Docker

**Backend:**
```bash
cd backend
npm install
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm install
ng serve
```

## 🧪 Testing

### Tests Unitarios

```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
npm run test
npm run test:cov
```

### Tests E2E

```bash
# Frontend
cd frontend
npm run e2e

# Backend
cd backend
npm run test:e2e
```

## 📚 Documentación de API

Una vez el backend esté corriendo, accede a:
- Swagger UI: `http://localhost:3000/api/docs`

## 🔑 Usuarios de Prueba

Después de ejecutar los seeders, puedes usar:

**Administrador:**
- Email: `admin@deepshop.com`
- Password: `Admin123!`

**Cliente:**
- Email: `customer@deepshop.com`
- Password: `Customer123!`

## 🎨 Características Principales

### Para Clientes
- ✅ Registro y autenticación
- ✅ Catálogo de productos con filtros y búsqueda
- ✅ Carrito de compras
- ✅ Checkout con Stripe
- ✅ Historial de pedidos
- ✅ Facturación automática en PDF
- ✅ Gestión de direcciones
- ✅ Reseñas de productos

### Para Administradores
- ✅ Panel de administración completo
- ✅ CRUD de productos con variantes
- ✅ Gestión de inventario
- ✅ Gestión de pedidos
- ✅ Gestión de usuarios
- ✅ Reportes y analytics
- ✅ Gestión de cupones de descuento

### Técnicas
- ✅ Diseño responsive y moderno
- ✅ Animaciones suaves
- ✅ Validaciones en tiempo real
- ✅ Control de stock en transacciones
- ✅ Protección contra compras concurrentes
- ✅ Logs de auditoría
- ✅ Rate limiting
- ✅ Seguridad (CORS, Helmet, XSS, CSRF)

## 🔐 Seguridad

El proyecto implementa múltiples capas de seguridad:
- Autenticación JWT con Supabase
- Row Level Security (RLS) en base de datos
- Validación de inputs con class-validator
- Sanitización de datos
- Protección CSRF
- Rate limiting
- Headers de seguridad con Helmet
- CORS configurado

## 📦 Despliegue en Producción

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build
# Subir carpeta dist/ a tu servicio de hosting
```

### Backend (Railway/Render/Fly.io)

```bash
cd backend
docker build -t deepshop-backend .
# Seguir instrucciones de tu plataforma
```

### Base de Datos

Ya está en Supabase - solo actualiza las URLs de producción.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autor

Desarrollado con ❤️ por el equipo de Deepshop

## 📧 Soporte

Para soporte, envía un email a support@deepshop.com o abre un issue en GitHub.

---

**¡Feliz Venta! 🎉**
