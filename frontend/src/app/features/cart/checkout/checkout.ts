import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';

/**
 * Componente Checkout
 * Página de finalización de compra
 */
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  // Paso actual del checkout
  currentStep = signal(1);

  // Formulario de envío
  shippingForm = signal({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Colombia',
  });

  // Formulario de pago
  paymentForm = signal({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  constructor(
    public cartService: CartService,
    private router: Router
  ) {
    // Redirigir si el carrito está vacío
    if (this.cartService.count() === 0) {
      this.router.navigate(['/cart']);
    }
  }

  /**
   * Ir al siguiente paso
   */
  nextStep() {
    if (this.currentStep() < 3) {
      this.currentStep.update((step) => step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * Volver al paso anterior
   */
  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * Finalizar compra
   */
  completeOrder() {
    // Aquí iría la lógica de procesamiento del pago
    alert('¡Pedido completado! (Simulación)');
    this.cartService.clearCart();
    this.router.navigate(['/account/orders']);
  }

  /**
   * Calcular envío
   */
  getShippingCost(): number {
    return this.cartService.total() >= 100 ? 0 : 10;
  }

  /**
   * Total final
   */
  getFinalTotal(): number {
    return this.cartService.total() + this.getShippingCost();
  }

  /**
   * Calcular precio final con descuento
   */
  getFinalPrice(item: any): number {
    if (item.discount) {
      return item.price * (1 - item.discount / 100);
    }
    return item.price;
  }
}
