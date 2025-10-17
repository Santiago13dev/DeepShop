import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

/**
 * Servicio de Wishlist (Favoritos)
 * Maneja la lista de productos favoritos del usuario
 */
@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  // Lista de favoritos
  private wishlistItems = signal<Product[]>([]);

  // Exponer como solo lectura
  items = this.wishlistItems.asReadonly();

  // Contador de items
  count = computed(() => this.wishlistItems().length);

  constructor() {
    // Cargar favoritos del localStorage
    this.loadFromStorage();
  }

  /**
   * Agregar producto a favoritos
   */
  addToWishlist(product: Product): void {
    const items = this.wishlistItems();
    const exists = items.find((item) => item.id === product.id);

    if (!exists) {
      this.wishlistItems.set([...items, product]);
      this.saveToStorage();
    }
  }

  /**
   * Remover producto de favoritos
   */
  removeFromWishlist(productId: string): void {
    const items = this.wishlistItems();
    this.wishlistItems.set(items.filter((item) => item.id !== productId));
    this.saveToStorage();
  }

  /**
   * Verificar si un producto está en favoritos
   */
  isInWishlist(productId: string): boolean {
    return this.wishlistItems().some((item) => item.id === productId);
  }

  /**
   * Toggle favorito (agregar/remover)
   */
  toggleWishlist(product: Product): void {
    if (this.isInWishlist(product.id)) {
      this.removeFromWishlist(product.id);
    } else {
      this.addToWishlist(product);
    }
  }

  /**
   * Limpiar todos los favoritos
   */
  clearWishlist(): void {
    this.wishlistItems.set([]);
    this.saveToStorage();
  }

  /**
   * Guardar en localStorage
   */
  private saveToStorage(): void {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems()));
  }

  /**
   * Cargar desde localStorage
   */
  private loadFromStorage(): void {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        this.wishlistItems.set(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }
}
