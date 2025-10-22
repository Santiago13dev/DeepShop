import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';

/**
 * Componente Horizontal Product Slider
 * Inspirado en DAMSO.com
 * Slider único y elegante para productos destacados
 */
@Component({
  selector: 'app-horizontal-product-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horizontal-product-slider.component.html',
  styleUrls: ['./horizontal-product-slider.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HorizontalProductSliderComponent implements OnInit, AfterViewInit {
  @Input() products: any[] = [];
  @Input() autoplay: boolean = true;
  @Input() loop: boolean = true;
  @Input() centeredSlides: boolean = true;
  
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  
  private swiper?: Swiper;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Productos de ejemplo si no se proporcionan
    if (this.products.length === 0) {
      this.products = this.getExampleProducts();
    }
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  /**
   * Inicializa Swiper con configuración personalizada
   */
  private initSwiper(): void {
    // Registrar módulos de Swiper
    Swiper.use([Navigation, Pagination, EffectCoverflow, Autoplay]);

    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: this.centeredSlides,
      loop: this.loop,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 0,
        stretch: 80,
        depth: 200,
        modifier: 1,
        slideShadows: false,
      },
      autoplay: this.autoplay ? {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      } : false,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 1.5,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1280: {
          slidesPerView: 2.5,
          spaceBetween: 50,
        }
      }
    });
  }

  /**
   * Navega al detalle del producto
   */
  goToProduct(productSlug: string): void {
    this.router.navigate(['/product', productSlug]);
  }

  /**
   * Agrega producto al carrito
   */
  addToCart(product: any, event: Event): void {
    event.stopPropagation();
    console.log('Agregando al carrito:', product);
    // TODO: Implementar lógica de carrito
  }

  /**
   * Productos de ejemplo
   */
  private getExampleProducts(): any[] {
    return [
      {
        id: 1,
        slug: 'producto-1',
        title: 'Producto Premium 1',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=800&fit=crop',
        category: 'Electrónica'
      },
      {
        id: 2,
        slug: 'producto-2',
        title: 'Producto Premium 2',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop',
        category: 'Accesorios'
      },
      {
        id: 3,
        slug: 'producto-3',
        title: 'Producto Premium 3',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop',
        category: 'Fashion'
      },
      {
        id: 4,
        slug: 'producto-4',
        title: 'Producto Premium 4',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=800&fit=crop',
        category: 'Tech'
      },
      {
        id: 5,
        slug: 'producto-5',
        title: 'Producto Premium 5',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=800&fit=crop',
        category: 'Lifestyle'
      }
    ];
  }

  ngOnDestroy(): void {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }
  }
}
