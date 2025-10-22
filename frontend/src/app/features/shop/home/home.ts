import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InfiniteMarqueeComponent } from '../../../shared/components/infinite-marquee/infinite-marquee.component';
import { HorizontalProductSliderComponent } from '../../../shared/components/horizontal-product-slider/horizontal-product-slider.component';
import { AnimationService } from '../../../core/services/animation.service';

/**
 * Componente Home
 * Página principal con diseño ultra minimalista estilo PERMIAN
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    InfiniteMarqueeComponent,
    HorizontalProductSliderComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  
  // Categorías destacadas
  categories = [
    {
      id: 1,
      name: 'Electrónica',
      slug: 'electronica',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=600&fit=crop',
      icon: '⚡'
    },
    {
      id: 2,
      name: 'Fashion',
      slug: 'fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop',
      icon: '👔'
    },
    {
      id: 3,
      name: 'Deportes',
      slug: 'deportes',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=600&fit=crop',
      icon: '🏃'
    },
    {
      id: 4,
      name: 'Hogar',
      slug: 'hogar',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=600&fit=crop',
      icon: '🏠'
    }
  ];

  // Características/beneficios
  features = [
    {
      icon: '🚚',
      title: 'Envío Gratis',
      description: 'En compras mayores a $50.000'
    },
    {
      icon: '🔒',
      title: 'Pago Seguro',
      description: 'Transacciones 100% protegidas'
    },
    {
      icon: '↩️',
      title: 'Devoluciones',
      description: '30 días para devoluciones'
    },
    {
      icon: '🎁',
      title: 'Recompensas',
      description: 'Programa de puntos exclusivo'
    }
  ];

  constructor(private animationService: AnimationService) {}

  ngOnInit(): void {
    // Inicialización
  }

  ngAfterViewInit(): void {
    // Inicializar animaciones de scroll después de que el DOM esté listo
    setTimeout(() => {
      this.animationService.initScrollAnimations();
      this.animationService.initParallax();
    }, 100);
  }

  ngOnDestroy(): void {
    // Limpiar animaciones al destruir el componente
    this.animationService.cleanup();
  }
}
