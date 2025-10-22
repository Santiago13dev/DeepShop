import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Servicio para controlar el estado del Expanding Loader
 */
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.loadingSubject.asObservable();

  private loadingCount = 0;

  /**
   * Muestra el loader
   */
  show(): void {
    this.loadingCount++;
    if (this.loadingCount === 1) {
      this.loadingSubject.next(true);
    }
  }

  /**
   * Oculta el loader
   */
  hide(): void {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    if (this.loadingCount === 0) {
      // Delay para permitir que la animación se complete
      setTimeout(() => {
        this.loadingSubject.next(false);
      }, 100);
    }
  }

  /**
   * Fuerza el ocultamiento del loader
   */
  forceHide(): void {
    this.loadingCount = 0;
    this.loadingSubject.next(false);
  }

  /**
   * Verifica si el loader está visible
   */
  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}
