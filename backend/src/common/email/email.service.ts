/**
 * Servicio de Email
 * Gestiona el envío de correos electrónicos usando SendGrid
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private useSendGrid: boolean;

  constructor(private configService: ConfigService) {
    // Determinar si usar SendGrid
    const sendGridKey = this.configService.get<string>('SENDGRID_API_KEY');
    
    if (sendGridKey) {
      // Configurar SendGrid
      sgMail.setApiKey(sendGridKey);
      this.useSendGrid = true;
      this.logger.log('✅ SendGrid configurado');
    } else {
      this.useSendGrid = false;
      this.logger.warn('⚠️  SendGrid no configurado. Los emails no se enviarán.');
    }
  }

  /**
   * Compilar plantilla HTML con Handlebars
   */
  private async compileTemplate(
    templateName: string,
    context: Record<string, any>,
  ): Promise<string> {
    try {
      const templatePath = path.join(
        __dirname,
        '../../templates/emails',
        `${templateName}.hbs`,
      );

      const templateSource = fs.readFileSync(templatePath, 'utf-8');
      const template = handlebars.compile(templateSource);
      
      return template(context);
    } catch (error) {
      this.logger.error(`Error compilando plantilla ${templateName}:`, error);
      throw error;
    }
  }

  /**
   * Enviar email usando SendGrid
   */
  private async sendWithSendGrid(options: EmailOptions): Promise<void> {
    try {
      const html = await this.compileTemplate(options.template, options.context);

      const msg: sgMail.MailDataRequired = {
        to: options.to,
        from: {
          email: this.configService.get<string>('EMAIL_FROM') || 'noreply@deepshop.com',
          name: this.configService.get<string>('EMAIL_FROM_NAME') || 'Deepshop',
        },
        subject: options.subject,
        html,
      };

      // Añadir archivos adjuntos si existen
      if (options.attachments && options.attachments.length > 0) {
        msg.attachments = options.attachments.map(att => ({
          filename: att.filename,
          content: att.content.toString('base64'),
          type: att.contentType,
          disposition: 'attachment',
        }));
      }

      await sgMail.send(msg);
      this.logger.log(`✉️  Email enviado a ${options.to} usando SendGrid`);
    } catch (error) {
      this.logger.error('Error enviando email con SendGrid:', error);
      throw error;
    }
  }

  /**
   * Enviar email (método principal)
   */
  async sendEmail(options: EmailOptions): Promise<void> {
    if (!this.useSendGrid) {
      this.logger.warn('SendGrid no configurado. Email no enviado.');
      return;
    }
    
    return this.sendWithSendGrid(options);
  }

  /**
   * Enviar email de confirmación de cuenta
   */
  async sendAccountConfirmation(to: string, name: string): Promise<void> {
    await this.sendEmail({
      to,
      subject: '¡Bienvenido a Deepshop! Confirma tu cuenta',
      template: 'account-confirmation',
      context: {
        name,
        confirmUrl: `${this.configService.get('FRONTEND_URL')}/auth/confirm`,
        supportEmail: this.configService.get('COMPANY_EMAIL'),
      },
    });
  }

  /**
   * Enviar email de confirmación de pedido
   */
  async sendOrderConfirmation(
    to: string,
    orderNumber: string,
    orderDetails: any,
  ): Promise<void> {
    await this.sendEmail({
      to,
      subject: `Confirmación de pedido #${orderNumber}`,
      template: 'order-confirmation',
      context: {
        orderNumber,
        ...orderDetails,
        trackingUrl: `${this.configService.get('FRONTEND_URL')}/account/orders/${orderNumber}`,
      },
    });
  }

  /**
   * Enviar factura por email
   */
  async sendInvoice(
    to: string,
    invoiceNumber: string,
    pdfBuffer: Buffer,
  ): Promise<void> {
    await this.sendEmail({
      to,
      subject: `Factura #${invoiceNumber} - Deepshop`,
      template: 'invoice',
      context: {
        invoiceNumber,
        downloadUrl: `${this.configService.get('FRONTEND_URL')}/account/invoices/${invoiceNumber}`,
      },
      attachments: [
        {
          filename: `factura-${invoiceNumber}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    });
  }

  /**
   * Enviar email de recuperación de contraseña
   */
  async sendPasswordReset(to: string, resetToken: string): Promise<void> {
    await this.sendEmail({
      to,
      subject: 'Recuperación de contraseña - Deepshop',
      template: 'password-reset',
      context: {
        resetUrl: `${this.configService.get('FRONTEND_URL')}/auth/reset-password?token=${resetToken}`,
        expirationTime: '1 hora',
      },
    });
  }

  /**
   * Enviar notificación de cambio de estado de pedido
   */
  async sendOrderStatusUpdate(
    to: string,
    orderNumber: string,
    status: string,
    trackingNumber?: string,
  ): Promise<void> {
    await this.sendEmail({
      to,
      subject: `Actualización de pedido #${orderNumber}`,
      template: 'order-status-update',
      context: {
        orderNumber,
        status,
        trackingNumber,
        trackingUrl: trackingNumber
          ? `${this.configService.get('FRONTEND_URL')}/track/${trackingNumber}`
          : null,
      },
    });
  }
}
