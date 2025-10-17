/**
 * Módulo de Storage
 * Proporciona servicios de almacenamiento de archivos
 */

import { Global, Module } from '@nestjs/common';
import { StorageService } from './storage.service';

@Global()
@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
