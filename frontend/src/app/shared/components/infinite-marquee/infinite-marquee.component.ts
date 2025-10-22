import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Infinite Marquee
 * Inspirado en BY ALEXANDER
 * Texto deslizante infinito con dirección configurable
 */
@Component({
  selector: 'app-infinite-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinite-marquee.component.html',
  styleUrls: ['./infinite-marquee.component.css']
})
export class InfiniteMarqueeComponent {
  @Input() text: string = 'DEEPSHOP • COMPRA AHORA • ENVÍOS GRATIS';
  @Input() speed: number = 50; // Velocidad en segundos
  @Input() direction: 'left' | 'right' = 'left';
  @Input() separator: string = '•';
  @Input() pauseOnHover: boolean = false;
  @Input() className: string = '';

  /**
   * Genera array de texto para el efecto infinito
   */
  get marqueeItems(): string[] {
    return Array(10).fill(this.text);
  }

  /**
   * Obtiene el estilo de animación
   */
  get animationStyle(): any {
    return {
      'animation-duration': `${this.speed}s`,
      'animation-direction': this.direction === 'right' ? 'reverse' : 'normal'
    };
  }
}
