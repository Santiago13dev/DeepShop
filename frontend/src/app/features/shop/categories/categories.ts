import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  encapsulation: ViewEncapsulation.None, // DESACTIVAR ENCAPSULACIÓN
  template: `
    <div class="categories-page-force">
      
      <div class="categories-header">
        <h1 class="categories-title">Explorar Categorías</h1>
        <p class="categories-subtitle">Descubre nuestra selección curada de productos</p>
      </div>

      <div class="categories-grid-force">
        
        <a [routerLink]="['/category', 'electronics']" class="category-item">
          <div class="category-badge">01</div>
          <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop" class="category-img">
          <div class="category-content">
            <h3 class="category-name">Electrónica</h3>
            <span class="category-counter">156 productos</span>
          </div>
        </a>

        <a [routerLink]="['/category', 'fashion']" class="category-item">
          <div class="category-badge">02</div>
          <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop" class="category-img">
          <div class="category-content">
            <h3 class="category-name">Moda</h3>
            <span class="category-counter">234 productos</span>
          </div>
        </a>

        <a [routerLink]="['/category', 'home']" class="category-item">
          <div class="category-badge">03</div>
          <img src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=600&fit=crop" class="category-img">
          <div class="category-content">
            <h3 class="category-name">Hogar</h3>
            <span class="category-counter">189 productos</span>
          </div>
        </a>

        <a [routerLink]="['/category', 'sports']" class="category-item">
          <div class="category-badge">04</div>
          <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop" class="category-img">
          <div class="category-content">
            <h3 class="category-name">Deportes</h3>
            <span class="category-counter">167 productos</span>
          </div>
        </a>

        <a [routerLink]="['/category', 'books']" class="category-item">
          <div class="category-badge">05</div>
          <img src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600&fit=crop" class="category-img">
          <div class="category-content">
            <h3 class="category-name">Libros</h3>
            <span class="category-counter">421 productos</span>
          </div>
        </a>

        <a [routerLink]="['/category', 'toys']" class="category-item">
          <div class="category-badge">06</div>
          <img src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop" class="category-img">
          <div class="category-content">
            <h3 class="category-name">Juguetes</h3>
            <span class="category-counter">203 productos</span>
          </div>
        </a>

        <a [routerLink]="['/category', 'beauty']" class="category-item">
          <div class="category-badge">07</div>
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop" class="category-img">
          <div class="category-content">
            <h3 class="category-name">Belleza</h3>
            <span class="category-counter">178 productos</span>
          </div>
        </a>

        <a [routerLink]="['/category', 'garden']" class="category-item">
          <div class="category-badge">08</div>
          <img src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop" class="category-img">
          <div class="category-content">
            <h3 class="category-name">Jardín</h3>
            <span class="category-counter">145 productos</span>
          </div>
        </a>

      </div>

      <div class="categories-cta">
        <h2 class="cta-title">¿Buscas algo específico?</h2>
        <p class="cta-text">Explora todo nuestro catálogo</p>
        <div class="cta-buttons">
          <a [routerLink]="['/catalog']" class="cta-primary">VER TODO</a>
          <a [routerLink]="['/offers']" class="cta-secondary">OFERTAS</a>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .categories-page-force {
      background-color: #1e293b !important;
      min-height: 100vh !important;
      padding: 150px 20px 60px !important;
      width: 100% !important;
    }

    .categories-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .categories-title {
      font-size: 72px !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      margin: 0 0 20px 0 !important;
      line-height: 1 !important;
    }

    .categories-subtitle {
      font-size: 18px !important;
      color: #cbd5e1 !important;
      margin: 0 !important;
    }

    .categories-grid-force {
      max-width: 1400px;
      margin: 0 auto;
      display: grid !important;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
      gap: 30px !important;
    }

    .category-item {
      display: block !important;
      background: #0f172a !important;
      border: 2px solid #475569 !important;
      border-radius: 16px !important;
      overflow: hidden !important;
      height: 400px !important;
      position: relative !important;
      text-decoration: none !important;
      cursor: pointer !important;
      transition: all 0.3s ease !important;
    }

    .category-item::after {
      display: none !important;
    }

    .category-item:hover {
      transform: translateY(-8px) !important;
      border-color: #a855f7 !important;
      box-shadow: 0 20px 50px rgba(168, 85, 247, 0.4) !important;
    }

    .category-badge {
      position: absolute !important;
      top: 20px !important;
      left: 20px !important;
      z-index: 10 !important;
      background: #a855f7 !important;
      color: #ffffff !important;
      padding: 8px 16px !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 700 !important;
    }

    .category-img {
      width: 100% !important;
      height: 100% !important;
      object-fit: cover !important;
      filter: brightness(0.5) !important;
      transition: all 0.5s ease !important;
      display: block !important;
    }

    .category-item:hover .category-img {
      filter: brightness(0.7) !important;
      transform: scale(1.05) !important;
    }

    .category-content {
      position: absolute !important;
      bottom: 30px !important;
      left: 30px !important;
      right: 30px !important;
      z-index: 5 !important;
    }

    .category-name {
      font-size: 28px !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      margin: 0 0 12px 0 !important;
      line-height: 1.2 !important;
    }

    .category-counter {
      font-size: 13px !important;
      color: #ffffff !important;
      background: rgba(255, 255, 255, 0.15) !important;
      padding: 6px 12px !important;
      border-radius: 6px !important;
      display: inline-block !important;
    }

    .categories-cta {
      text-align: center;
      margin-top: 80px;
    }

    .cta-title {
      font-size: 36px !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      margin: 0 0 12px 0 !important;
    }

    .cta-text {
      font-size: 16px !important;
      color: #94a3b8 !important;
      margin: 0 0 30px 0 !important;
    }

    .cta-buttons {
      display: flex !important;
      gap: 12px !important;
      justify-content: center !important;
      flex-wrap: wrap !important;
    }

    .cta-primary,
    .cta-secondary {
      display: inline-block !important;
      padding: 14px 32px !important;
      border-radius: 8px !important;
      font-size: 12px !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      text-decoration: none !important;
      transition: all 0.3s ease !important;
    }

    .cta-primary::after,
    .cta-secondary::after {
      display: none !important;
    }

    .cta-primary {
      background: #a855f7 !important;
      color: #ffffff !important;
      border: 2px solid #a855f7 !important;
    }

    .cta-primary:hover {
      background: #9333ea !important;
      border-color: #9333ea !important;
      transform: translateY(-2px) !important;
    }

    .cta-secondary {
      background: transparent !important;
      color: #ffffff !important;
      border: 2px solid #475569 !important;
    }

    .cta-secondary:hover {
      border-color: #a855f7 !important;
      background: rgba(168, 85, 247, 0.1) !important;
      transform: translateY(-2px) !important;
    }

    @media (max-width: 768px) {
      .categories-title {
        font-size: 48px !important;
      }
      
      .categories-grid-force {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
      }
      
      .category-item {
        height: 350px !important;
      }
      
      .category-name {
        font-size: 24px !important;
      }
    }
  `]
})
export class Categories {
  constructor() {
    console.log('✅ Componente Categories con ViewEncapsulation.None');
  }
}
