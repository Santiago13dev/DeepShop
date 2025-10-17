import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Componente Categories
 * Muestra todas las categorías disponibles
 */
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories {
  // Todas las categorías
  categories = [
    {
      slug: 'electronics',
      name: 'Electrónica',
      description: 'Smartphones, laptops, tablets y más',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
      icon: '💻',
      count: 89,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      slug: 'fashion',
      name: 'Moda',
      description: 'Ropa, calzado y accesorios',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
      icon: '👗',
      count: 67,
      color: 'from-pink-500 to-rose-500',
    },
    {
      slug: 'home',
      name: 'Hogar',
      description: 'Muebles, decoración y más',
      image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800',
      icon: '🏠',
      count: 45,
      color: 'from-green-500 to-emerald-500',
    },
    {
      slug: 'sports',
      name: 'Deportes',
      description: 'Equipamiento y ropa deportiva',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800',
      icon: '⚽',
      count: 34,
      color: 'from-orange-500 to-amber-500',
    },
    {
      slug: 'books',
      name: 'Libros',
      description: 'Ficción, no ficción y más',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800',
      icon: '📚',
      count: 28,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      slug: 'toys',
      name: 'Juguetes',
      description: 'Juguetes y juegos para niños',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800',
      icon: '🎮',
      count: 42,
      color: 'from-red-500 to-pink-500',
    },
  ];
}
