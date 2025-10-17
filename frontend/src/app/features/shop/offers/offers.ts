import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../../shared/components/product-card/product-card';

/**
 * Componente Offers
 * Muestra productos en oferta y promociones especiales
 */
@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './offers.html',
  styleUrl: './offers.css',
})
export class Offers {
  // Tiempo restante para ofertas (countdown simulado)
  timeLeft = signal({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  // Ofertas destacadas
  featuredOffers = [
    {
      id: '1',
      title: 'Flash Sale',
      description: 'Hasta 70% de descuento',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600',
      discount: 70,
      color: 'from-red-500 to-pink-500',
      icon: '⚡',
    },
    {
      id: '2',
      title: 'Electrónica',
      description: 'Hasta 50% de descuento',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600',
      discount: 50,
      color: 'from-blue-500 to-cyan-500',
      icon: '💻',
    },
    {
      id: '3',
      title: 'Moda',
      description: 'Hasta 40% de descuento',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600',
      discount: 40,
      color: 'from-purple-500 to-pink-500',
      icon: '👗',
    },
  ];

  // Productos en oferta
  offerProducts = signal([
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1696446702183-cbd80474ea88?w=500',
      rating: 4.8,
      reviews: 245,
      discount: 25,
    },
    {
      id: '2',
      name: 'MacBook Air M2',
      price: 1199.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      rating: 4.9,
      reviews: 189,
      discount: 20,
    },
    {
      id: '3',
      name: 'AirPods Pro 2',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
      rating: 4.7,
      reviews: 312,
      discount: 30,
    },
    {
      id: '4',
      name: 'Apple Watch Series 9',
      price: 429.99,
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
      rating: 4.6,
      reviews: 156,
      discount: 15,
    },
    {
      id: '5',
      name: 'iPad Pro 12.9"',
      price: 1099.99,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      rating: 4.8,
      reviews: 203,
      discount: 18,
    },
    {
      id: '6',
      name: 'Sony WH-1000XM5',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
      rating: 4.9,
      reviews: 445,
      discount: 22,
    },
    {
      id: '7',
      name: 'Samsung Galaxy S24 Ultra',
      price: 1199.99,
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
      rating: 4.7,
      reviews: 321,
      discount: 28,
    },
    {
      id: '8',
      name: 'Nike Air Max 2024',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      rating: 4.5,
      reviews: 189,
      discount: 35,
    },
  ]);

  // Cupones disponibles
  coupons = [
    {
      code: 'WELCOME10',
      description: '10% de descuento en tu primera compra',
      discount: 10,
      type: 'percentage',
    },
    {
      code: 'MEGA50',
      description: '$50 de descuento en compras superiores a $500',
      discount: 50,
      type: 'fixed',
    },
    {
      code: 'FREESHIP',
      description: 'Envío gratis en todos tus pedidos',
      discount: 0,
      type: 'shipping',
    },
  ];

  /**
   * Copiar código de cupón
   */
  copyCoupon(code: string) {
    navigator.clipboard.writeText(code);
    alert(`Código ${code} copiado al portapapeles!`);
  }
}
