/**
 * Servicio de Prisma - Cliente de base de datos
 * Gestiona la conexión con PostgreSQL/Supabase
 */

import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
      errorFormat: 'colorless',
    });
  }

  /**
   * Conectar a la base de datos cuando el módulo se inicializa
   */
  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Conexión a base de datos establecida');

      // Listeners para logging de queries (solo en desarrollo)
      if (process.env.NODE_ENV === 'development') {
        this.$on('query' as never, (e: any) => {
          this.logger.debug(`Query: ${e.query}`);
          this.logger.debug(`Duration: ${e.duration}ms`);
        });
      }

      this.$on('error' as never, (e: any) => {
        this.logger.error(`Error en base de datos: ${e.message}`);
      });
    } catch (error) {
      this.logger.error('❌ Error al conectar con la base de datos', error);
      throw error;
    }
  }

  /**
   * Desconectar de la base de datos cuando el módulo se destruye
   */
  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Desconectado de la base de datos');
  }

  /**
   * Limpiar la base de datos (solo para testing)
   */
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('No se puede limpiar la base de datos en producción');
    }

    const models = Reflect.ownKeys(this).filter(
      (key) => key !== '_' && !key.toString().startsWith('$'),
    );

    return Promise.all(
      models.map((modelKey) => {
        const model = this[modelKey as keyof this];
        if (model && typeof model === 'object' && 'deleteMany' in model) {
          return (model as any).deleteMany();
        }
      }),
    );
  }
}
