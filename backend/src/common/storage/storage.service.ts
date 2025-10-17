/**
 * Servicio de Storage (Supabase Storage)
 * Gestiona la subida y descarga de archivos
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private supabase: SupabaseClient;
  private bucket: string;

  constructor(private configService: ConfigService) {
    // Inicializar cliente de Supabase
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL')!,
      this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    this.bucket = this.configService.get<string>('SUPABASE_STORAGE_BUCKET')!;
    this.logger.log(`✅ Supabase Storage configurado (bucket: ${this.bucket})`);
  }

  /**
   * Subir un archivo al storage
   */
  async uploadFile(
    path: string,
    file: Buffer,
    contentType: string,
  ): Promise<{ path: string; url: string }> {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucket)
        .upload(path, file, {
          contentType,
          upsert: true, // Sobrescribir si existe
        });

      if (error) {
        this.logger.error('Error subiendo archivo:', error);
        throw error;
      }

      // Obtener URL pública del archivo
      const { data: urlData } = this.supabase.storage
        .from(this.bucket)
        .getPublicUrl(path);

      this.logger.log(`📤 Archivo subido: ${path}`);

      return {
        path: data.path,
        url: urlData.publicUrl,
      };
    } catch (error) {
      this.logger.error('Error en uploadFile:', error);
      throw error;
    }
  }

  /**
   * Descargar un archivo del storage
   */
  async downloadFile(path: string): Promise<Buffer> {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucket)
        .download(path);

      if (error) {
        this.logger.error('Error descargando archivo:', error);
        throw error;
      }

      const buffer = Buffer.from(await data.arrayBuffer());
      this.logger.log(`📥 Archivo descargado: ${path}`);

      return buffer;
    } catch (error) {
      this.logger.error('Error en downloadFile:', error);
      throw error;
    }
  }

  /**
   * Eliminar un archivo del storage
   */
  async deleteFile(path: string): Promise<void> {
    try {
      const { error } = await this.supabase.storage
        .from(this.bucket)
        .remove([path]);

      if (error) {
        this.logger.error('Error eliminando archivo:', error);
        throw error;
      }

      this.logger.log(`🗑️  Archivo eliminado: ${path}`);
    } catch (error) {
      this.logger.error('Error en deleteFile:', error);
      throw error;
    }
  }

  /**
   * Obtener URL pública de un archivo
   */
  getPublicUrl(path: string): string {
    const { data } = this.supabase.storage
      .from(this.bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  }

  /**
   * Obtener URL firmada (temporal) de un archivo
   */
  async getSignedUrl(path: string, expiresIn: number = 3600): Promise<string> {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucket)
        .createSignedUrl(path, expiresIn);

      if (error) {
        this.logger.error('Error generando URL firmada:', error);
        throw error;
      }

      return data.signedUrl;
    } catch (error) {
      this.logger.error('Error en getSignedUrl:', error);
      throw error;
    }
  }

  /**
   * Listar archivos en una carpeta
   */
  async listFiles(folder: string = ''): Promise<any[]> {
    try {
      const { data, error } = await this.supabase.storage
        .from(this.bucket)
        .list(folder);

      if (error) {
        this.logger.error('Error listando archivos:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      this.logger.error('Error en listFiles:', error);
      throw error;
    }
  }
}
