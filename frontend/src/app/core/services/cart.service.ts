import { Injectable, signal, computed } from '@angular/core';
import { Product, CartItem } from './wishlist.service';

/**
 * Servicio de Carrito
 * Maneja el carrito de compras del usuario
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Items del carrito
  private cartItems = signal<CartItem[]>([]);

  // Exponer como solo lectura
  items = this.cartItems.asReadonly();

  // Contador de items
  count = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });

  // Total del carrito
  total = computed(() => {
    return this.cartItems().reduce((total, item) => {
      const price = item.discount
        ? item.price * (1 - item.discount / 100)
        : item.price;
      return total + price * item.quantity;
    }, 0);
  });

  // Subtotal (antes de descuentos)
  subtotal = computed(() => {
    return this.cartItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  });

  // Total de descuentos
  discountTotal = computed(() => {
    return this.subtotal() - this.total();
  });

  constructor() {
    // Cargar carrito del localStorage
    this.loadFromStorage();
  }

  /**
   * Agregar producto al carrito
   */
  addToCart(product: Product, quantity: number = 1): void {
    const items = this.cartItems();
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      // Incrementar cantidad
      this.cartItems.set(
        items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Agregar nuevo item
      this.cartItems.set([...items, { ...product, quantity }]);
    }

    this.saveToStorage();
  }

  /**
   * Remover producto del carrito
   */
  removeFromCart(productId: string): void {
    const items = this.cartItems();
    this.cartItems.set(items.filter((item) => item.id !== productId));
    this.saveToStorage();
  }

  /**
   * Actualizar cantidad de un producto
   */
  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const items = this.cartItems();
    this.cartItems.set(
      items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
    this.saveToStorage();
  }

  /**
   * Limpiar carrito
   */
  clearCart(): void {
    this.cartItems.set([]);
    this.saveToStorage();
  }

  /**
   * Guardar en localStorage
   */
  private saveToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  /**
   * Cargar desde localStorage
   */
  private loadFromStorage(): void {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        this.cartItems.set(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }
}
