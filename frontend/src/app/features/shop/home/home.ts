import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCard } from '../../../shared/components/product-card/product-card';

/**
 * Componente Home
 * Página principal del e-commerce
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  // Productos destacados
  featuredProducts = signal([
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1696446702183-cbd80474ea88?w=500',
      rating: 4.8,
      reviews: 245,
      discount: 10,
    },
    {
      id: '2',
      name: 'MacBook Air M2',
      price: 1199.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      rating: 4.9,
      reviews: 189,
    },
    {
      id: '3',
      name: 'AirPods Pro 2',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
      rating: 4.7,
      reviews: 312,
      discount: 15,
    },
    {
      id: '4',
      name: 'Apple Watch Series 9',
      price: 429.99,
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
      rating: 4.6,
      reviews: 156,
    },
  ]);

  // Categorías destacadas
  categories = signal([
    {
      name: 'Electrónica',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500',
      count: 245,
    },
    {
      name: 'Moda',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500',
      count: 189,
    },
    {
      name: 'Hogar',
      image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=500',
      count: 312,
    },
    {
      name: 'Deportes',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500',
      count: 156,
    },
  ]);

  // Beneficios
  benefits = [
    {
      icon: 'truck',
      title: 'Envío Gratis',
      description: 'En compras superiores a $50',
    },
    {
      icon: 'shield',
      title: 'Compra Segura',
      description: 'Protección de datos garantizada',
    },
    {
      icon: 'refresh',
      title: 'Devoluciones',
      description: '30 días para devoluciones',
    },
    {
      icon: 'support',
      title: 'Soporte 24/7',
      description: 'Estamos aquí para ayudarte',
    },
  ];

  ngOnInit() {
    console.log('Home component initialized');
  }
}
