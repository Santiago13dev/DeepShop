import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

/**
 * Componente ProductCard
 * Tarjeta de producto reutilizable
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input() product: any;

  constructor(
    private cartService: CartService,
    public wishlistService: WishlistService
  ) {}

  /**
   * Agregar al carrito
   */
  addToCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.addToCart(this.product);
    // Mostrar feedback visual (toast)
    console.log('Producto agregado al carrito:', this.product.name);
  }

  /**
   * Agregar/remover de favoritos
   */
  toggleWishlist(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.wishlistService.toggleWishlist(this.product);
  }

  /**
   * Verificar si está en favoritos
   */
  isInWishlist(): boolean {
    return this.wishlistService.isInWishlist(this.product.id);
  }
}
