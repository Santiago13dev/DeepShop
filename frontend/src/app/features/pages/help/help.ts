import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Componente Help
 * Página de ayuda y preguntas frecuentes
 */
@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './help.html',
  styleUrl: './help.css',
})
export class Help {
  faqs = [
    {
      question: '¿Cómo puedo realizar un pedido?',
      answer: 'Navega por nuestro catálogo, agrega productos a tu carrito y sigue el proceso de checkout. Es rápido y seguro.',
      category: 'Pedidos',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos tarjetas de crédito (Visa, Mastercard, American Express), PayPal y transferencias bancarias.',
      category: 'Pagos',
    },
    {
      question: '¿Cuánto tiempo tarda el envío?',
      answer: 'El envío estándar tarda entre 3-5 días hábiles. El envío express llega en 1-2 días hábiles.',
      category: 'Envíos',
    },
    {
      question: '¿Puedo devolver un producto?',
      answer: 'Sí, tienes 30 días para devolver cualquier producto en su estado original. El proceso es simple y gratuito.',
      category: 'Devoluciones',
    },
    {
      question: '¿Cómo puedo rastrear mi pedido?',
      answer: 'Una vez enviado tu pedido, recibirás un correo con el número de seguimiento y un enlace para rastrearlo.',
      category: 'Envíos',
    },
    {
      question: '¿Ofrecen garantía?',
      answer: 'Todos nuestros productos tienen garantía del fabricante. Además, ofrecemos 30 días de satisfacción garantizada.',
      category: 'Garantías',
    },
  ];

  categories = ['Todos', 'Pedidos', 'Pagos', 'Envíos', 'Devoluciones', 'Garantías'];
  selectedCategory = 'Todos';

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredFaqs() {
    if (this.selectedCategory === 'Todos') {
      return this.faqs;
    }
    return this.faqs.filter(faq => faq.category === this.selectedCategory);
  }
}
