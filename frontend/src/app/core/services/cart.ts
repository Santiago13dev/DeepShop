import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: any, quantity: number = 1) {
    const current = this.cartItems.value;
    const existing = current.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += quantity;
      this.cartItems.next([...current]);
    } else {
      this.cartItems.next([...current, { ...product, quantity }]);
    }
  }

  removeFromCart(productId: string) {
    const filtered = this.cartItems.value.filter(item => item.id !== productId);
    this.cartItems.next(filtered);
  }

  clearCart() {
    this.cartItems.next([]);
  }

  getTotal() {
    return this.cartItems.value.reduce(
      (sum, item) => sum + (item.priceCents * item.quantity),
      0
    );
  }
}