import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';

/**
 * Controlador de Facturas
 */
@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get(':id')
  async getInvoice(@Param('id') id: string) {
    return { message: 'Invoices endpoint' };
  }
}
