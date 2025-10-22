import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

/**
 * Componente Expanding Loader
 * Inspirado en PERMIAN WORLD
 * Cuadrado azul neón que se expande al cargar
 */
@Component({
  selector: 'app-expanding-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expanding-loader.component.html',
  styleUrls: ['./expanding-loader.component.css'],
  animations: [
    trigger('loaderState', [
      state('hidden', style({
        opacity: 0,
        pointerEvents: 'none'
      })),
      state('visible', style({
        opacity: 1,
        pointerEvents: 'all'
      })),
      transition('visible => hidden', [
        animate('600ms ease-out')
      ])
    ])
  ]
})
export class ExpandingLoaderComponent implements OnInit {
  isVisible = true;
  isExpanding = false;

  ngOnInit(): void {
    // Mostrar loader automáticamente al inicio
    this.showInitialLoader();
  }

  /**
   * Mostrar loader inicial al cargar la aplicación
   */
  private showInitialLoader(): void {
    // Iniciar expansión inmediatamente
    setTimeout(() => {
      this.isExpanding = true;
    }, 100);

    // Ocultar después de 2 segundos
    setTimeout(() => {
      this.hide();
    }, 2000);
  }

  /**
   * Ocultar el loader con animación
   */
  hide(): void {
    this.isVisible = false;
  }
}
