import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Servicio de Smooth Scroll
 * Inspirado en BY ALEXANDER para scroll suave y fluido
 * Usa Locomotive Scroll para experiencias premium
 */
@Injectable({
  providedIn: 'root'
})
export class SmoothScrollService implements OnDestroy {
  private scrollInstance: any = null;
  private isInitialized = new BehaviorSubject<boolean>(false);
  public isInitialized$ = this.isInitialized.asObservable();

  constructor() {}

  /**
   * Inicializa Locomotive Scroll
   * @param container - Elemento contenedor del scroll (por defecto document.body)
   * @param options - Opciones de configuración
   */
  async init(container?: HTMLElement, options?: any): Promise<void> {
    if (this.scrollInstance) {
      console.warn('SmoothScroll ya está inicializado');
      return;
    }

    try {
      // Importar Locomotive Scroll dinámicamente
      const LocomotiveScroll = (await import('locomotive-scroll')).default;

      // Configuración por defecto
      const defaultOptions = {
        el: container || document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1.0,
        class: 'is-inview',
        smartphone: {
          smooth: true
        },
        tablet: {
          smooth: true
        },
        ...options
      };

      // Crear instancia
      this.scrollInstance = new LocomotiveScroll(defaultOptions);

      // Actualizar después de un frame para asegurar el render
      requestAnimationFrame(() => {
        this.scrollInstance?.update();
        this.isInitialized.next(true);
      });

      console.log('✅ SmoothScroll inicializado correctamente');
    } catch (error) {
      console.error('❌ Error al inicializar SmoothScroll:', error);
    }
  }

  /**
   * Scroll hacia un elemento específico
   * @param target - Selector CSS o elemento HTML
   * @param options - Opciones del scroll
   */
  scrollTo(target: string | HTMLElement, options?: { offset?: number; duration?: number }): void {
    if (!this.scrollInstance) {
      console.warn('SmoothScroll no está inicializado');
      return;
    }

    this.scrollInstance.scrollTo(target, {
      offset: options?.offset || 0,
      duration: options?.duration || 1000,
      easing: [0.25, 0.0, 0.35, 1.0]
    });
  }

  /**
   * Actualiza el scroll (útil después de cambios en el DOM)
   */
  update(): void {
    if (this.scrollInstance) {
      this.scrollInstance.update();
    }
  }

  /**
   * Detiene el scroll temporalmente
   */
  stop(): void {
    if (this.scrollInstance) {
      this.scrollInstance.stop();
    }
  }

  /**
   * Reanuda el scroll
   */
  start(): void {
    if (this.scrollInstance) {
      this.scrollInstance.start();
    }
  }

  /**
   * Scroll al inicio de la página
   */
  scrollToTop(duration: number = 1000): void {
    this.scrollTo('top', { duration });
  }

  /**
   * Destruye la instancia de scroll
   */
  destroy(): void {
    if (this.scrollInstance) {
      this.scrollInstance.destroy();
      this.scrollInstance = null;
      this.isInitialized.next(false);
      console.log('🗑️ SmoothScroll destruido');
    }
  }

  /**
   * Obtiene la posición actual del scroll
   */
  getScrollPosition(): { x: number; y: number } {
    if (!this.scrollInstance) {
      return { x: 0, y: 0 };
    }

    return {
      x: this.scrollInstance.scroll.instance.scroll.x,
      y: this.scrollInstance.scroll.instance.scroll.y
    };
  }

  /**
   * Verifica si está inicializado
   */
  isReady(): boolean {
    return this.isInitialized.value;
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
