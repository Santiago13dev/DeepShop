import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist.service';
import { CartService } from '../../../core/services/cart.service';
import { ProductCard } from '../../../shared/components/product-card/product-card';

/**
 * Componente Wishlist
 * Página de productos favoritos del usuario
 */
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  constructor(
    public wishlistService: WishlistService,
    private cartService: CartService
  ) {}

  /**
   * Agregar todos los favoritos al carrito
   */
  addAllToCart() {
    this.wishlistService.items().forEach((product) => {
      this.cartService.addToCart(product);
    });
    alert('Todos los productos han sido agregados al carrito!');
  }

  /**
   * Limpiar lista de favoritos
   */
  clearWishlist() {
    if (confirm('¿Estás seguro de que quieres eliminar todos tus favoritos?')) {
      this.wishlistService.clearWishlist();
    }
  }
}
