import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';

/**
 * Componente CartView
 * Página del carrito de compras
 */
@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart-view.html',
  styleUrl: './cart-view.css',
})
export class CartView {
  constructor(public cartService: CartService) {}

  /**
   * Calcular precio con descuento
   */
  getFinalPrice(item: any): number {
    if (item.discount) {
      return item.price * (1 - item.discount / 100);
    }
    return item.price;
  }

  /**
   * Calcular ahorro
   */
  getSavings(item: any): number {
    if (item.discount) {
      return (item.price * item.discount / 100) * item.quantity;
    }
    return 0;
  }

  /**
   * Incrementar cantidad
   */
  incrementQuantity(productId: string, currentQuantity: number) {
    this.cartService.updateQuantity(productId, currentQuantity + 1);
  }

  /**
   * Decrementar cantidad
   */
  decrementQuantity(productId: string, currentQuantity: number) {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(productId, currentQuantity - 1);
    }
  }

  /**
   * Actualizar cantidad directamente
   */
  updateQuantity(productId: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value) || 1;
    this.cartService.updateQuantity(productId, Math.max(1, quantity));
  }

  /**
   * Remover item
   */
  removeItem(productId: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  /**
   * Limpiar carrito
   */
  clearCart() {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      this.cartService.clearCart();
    }
  }

  /**
   * Calcular envío (simulado)
   */
  getShippingCost(): number {
    return this.cartService.total() >= 100 ? 0 : 10;
  }

  /**
   * Total final con envío
   */
  getFinalTotal(): number {
    return this.cartService.total() + this.getShippingCost();
  }
}
