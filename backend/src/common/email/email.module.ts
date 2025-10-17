/**
 * Módulo de Email
 * Proporciona servicios de envío de correos electrónicos
 */

import { Global, Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Global()
@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
