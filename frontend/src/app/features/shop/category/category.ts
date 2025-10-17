import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ProductCard } from '../../../shared/components/product-card/product-card';

/**
 * Componente Category
 * Muestra productos de una categoría específica
 */
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category implements OnInit {
  categorySlug = signal<string>('');
  
  // Datos de categorías
  categoryData: any = {
    electronics: {
      name: 'Electrónica',
      description: 'Los mejores dispositivos electrónicos y gadgets del mercado',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200',
      icon: '💻',
    },
    fashion: {
      name: 'Moda',
      description: 'Tendencias y estilo para cada ocasión',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
      icon: '👗',
    },
    home: {
      name: 'Hogar',
      description: 'Todo lo que necesitas para tu hogar',
      image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=1200',
      icon: '🏠',
    },
    sports: {
      name: 'Deportes',
      description: 'Equipamiento deportivo de alta calidad',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200',
      icon: '⚽',
    },
    books: {
      name: 'Libros',
      description: 'Descubre tu próxima lectura favorita',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200',
      icon: '📚',
    },
  };

  // Subcategorías por categoría
  subcategories: any = {
    electronics: [
      { name: 'Smartphones', count: 45, slug: 'smartphones' },
      { name: 'Laptops', count: 23, slug: 'laptops' },
      { name: 'Tablets', count: 12, slug: 'tablets' },
      { name: 'Audio', count: 34, slug: 'audio' },
      { name: 'Accesorios', count: 56, slug: 'accessories' },
    ],
    fashion: [
      { name: 'Hombre', count: 32, slug: 'men' },
      { name: 'Mujer', count: 45, slug: 'women' },
      { name: 'Niños', count: 18, slug: 'kids' },
      { name: 'Accesorios', count: 23, slug: 'accessories' },
    ],
    home: [
      { name: 'Muebles', count: 28, slug: 'furniture' },
      { name: 'Decoración', count: 34, slug: 'decor' },
      { name: 'Cocina', count: 19, slug: 'kitchen' },
      { name: 'Baño', count: 12, slug: 'bathroom' },
    ],
    sports: [
      { name: 'Fitness', count: 25, slug: 'fitness' },
      { name: 'Running', count: 18, slug: 'running' },
      { name: 'Ciclismo', count: 14, slug: 'cycling' },
      { name: 'Natación', count: 10, slug: 'swimming' },
    ],
    books: [
      { name: 'Ficción', count: 45, slug: 'fiction' },
      { name: 'No Ficción', count: 32, slug: 'non-fiction' },
      { name: 'Técnicos', count: 23, slug: 'technical' },
      { name: 'Infantiles', count: 18, slug: 'kids' },
    ],
  };

  // Productos de la categoría
  categoryProducts = signal([
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
    {
      id: '5',
      name: 'iPad Pro 12.9"',
      price: 1099.99,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      rating: 4.8,
      reviews: 203,
      discount: 5,
    },
    {
      id: '6',
      name: 'Sony WH-1000XM5',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
      rating: 4.9,
      reviews: 445,
    },
  ]);

  // Información de la categoría actual
  currentCategory = computed(() => {
    return this.categoryData[this.categorySlug()] || null;
  });

  // Subcategorías de la categoría actual
  currentSubcategories = computed(() => {
    return this.subcategories[this.categorySlug()] || [];
  });

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.categorySlug.set(params['slug']);
    });
  }
}
