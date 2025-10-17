import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '../../../shared/components/product-card/product-card';

/**
 * Componente Catalog
 * Página de exploración de productos con filtros y búsqueda
 */
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
  // Estado del sidebar de filtros (móvil)
  showFilters = signal(false);

  // Filtros
  selectedCategory = signal<string>('all');
  selectedPriceRange = signal<string>('all');
  selectedRating = signal<number>(0);
  searchQuery = signal<string>('');
  sortBy = signal<string>('popularity');

  // Paginación
  currentPage = signal(1);
  itemsPerPage = 12;

  // Categorías disponibles
  categories = [
    { id: 'all', name: 'Todas las Categorías', count: 245 },
    { id: 'electronics', name: 'Electrónica', count: 89 },
    { id: 'fashion', name: 'Moda', count: 67 },
    { id: 'home', name: 'Hogar', count: 45 },
    { id: 'sports', name: 'Deportes', count: 34 },
    { id: 'books', name: 'Libros', count: 10 },
  ];

  // Rangos de precio
  priceRanges = [
    { id: 'all', label: 'Todos los precios' },
    { id: '0-50', label: 'Menos de $50' },
    { id: '50-100', label: '$50 - $100' },
    { id: '100-500', label: '$100 - $500' },
    { id: '500-1000', label: '$500 - $1,000' },
    { id: '1000+', label: 'Más de $1,000' },
  ];

  // Opciones de ordenamiento
  sortOptions = [
    { id: 'popularity', label: 'Más Popular' },
    { id: 'price-low', label: 'Precio: Menor a Mayor' },
    { id: 'price-high', label: 'Precio: Mayor a Menor' },
    { id: 'rating', label: 'Mejor Valorados' },
    { id: 'newest', label: 'Más Recientes' },
  ];

  // Productos (simulados - en producción vendrían del backend)
  allProducts = signal([
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1696446702183-cbd80474ea88?w=500',
      rating: 4.8,
      reviews: 245,
      category: 'electronics',
      discount: 10,
    },
    {
      id: '2',
      name: 'MacBook Air M2',
      price: 1199.99,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      rating: 4.9,
      reviews: 189,
      category: 'electronics',
    },
    {
      id: '3',
      name: 'AirPods Pro 2',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
      rating: 4.7,
      reviews: 312,
      category: 'electronics',
      discount: 15,
    },
    {
      id: '4',
      name: 'Apple Watch Series 9',
      price: 429.99,
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
      rating: 4.6,
      reviews: 156,
      category: 'electronics',
    },
    {
      id: '5',
      name: 'iPad Pro 12.9"',
      price: 1099.99,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      rating: 4.8,
      reviews: 203,
      category: 'electronics',
      discount: 5,
    },
    {
      id: '6',
      name: 'Sony WH-1000XM5',
      price: 399.99,
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500',
      rating: 4.9,
      reviews: 445,
      category: 'electronics',
    },
    {
      id: '7',
      name: 'Samsung Galaxy S24 Ultra',
      price: 1199.99,
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
      rating: 4.7,
      reviews: 321,
      category: 'electronics',
      discount: 8,
    },
    {
      id: '8',
      name: 'Nike Air Max 2024',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      rating: 4.5,
      reviews: 189,
      category: 'sports',
    },
    {
      id: '9',
      name: 'Adidas Ultraboost',
      price: 189.99,
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
      rating: 4.6,
      reviews: 234,
      category: 'sports',
    },
    {
      id: '10',
      name: 'Levi\'s 501 Jeans',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
      rating: 4.4,
      reviews: 567,
      category: 'fashion',
      discount: 20,
    },
    {
      id: '11',
      name: 'The North Face Jacket',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      rating: 4.7,
      reviews: 178,
      category: 'fashion',
    },
    {
      id: '12',
      name: 'Dyson V15 Vacuum',
      price: 649.99,
      image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
      rating: 4.8,
      reviews: 289,
      category: 'home',
    },
  ]);

  // Productos filtrados (computed)
  filteredProducts = computed(() => {
    let products = [...this.allProducts()];

    // Filtrar por categoría
    if (this.selectedCategory() !== 'all') {
      products = products.filter(
        (p) => p.category === this.selectedCategory()
      );
    }

    // Filtrar por rango de precio
    if (this.selectedPriceRange() !== 'all') {
      const range = this.selectedPriceRange();
      products = products.filter((p) => {
        if (range === '0-50') return p.price < 50;
        if (range === '50-100') return p.price >= 50 && p.price < 100;
        if (range === '100-500') return p.price >= 100 && p.price < 500;
        if (range === '500-1000') return p.price >= 500 && p.price < 1000;
        if (range === '1000+') return p.price >= 1000;
        return true;
      });
    }

    // Filtrar por rating
    if (this.selectedRating() > 0) {
      products = products.filter((p) => p.rating >= this.selectedRating());
    }

    // Filtrar por búsqueda
    if (this.searchQuery().trim()) {
      const query = this.searchQuery().toLowerCase();
      products = products.filter((p) =>
        p.name.toLowerCase().includes(query)
      );
    }

    // Ordenar
    const sortBy = this.sortBy();
    if (sortBy === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popularity') {
      products.sort((a, b) => b.reviews - a.reviews);
    }

    return products;
  });

  // Productos paginados
  paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProducts().slice(start, end);
  });

  // Total de páginas
  totalPages = computed(() => {
    return Math.ceil(this.filteredProducts().length / this.itemsPerPage);
  });

  // Exponer Math al template
  Math = Math;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Leer parámetros de URL si existen
    this.route.queryParams.subscribe((params) => {
      if (params['category']) {
        this.selectedCategory.set(params['category']);
      }
      if (params['search']) {
        this.searchQuery.set(params['search']);
      }
    });
  }

  /**
   * Toggle filtros en móvil
   */
  toggleFilters() {
    this.showFilters.update((value) => !value);
  }

  /**
   * Limpiar todos los filtros
   */
  clearFilters() {
    this.selectedCategory.set('all');
    this.selectedPriceRange.set('all');
    this.selectedRating.set(0);
    this.searchQuery.set('');
    this.currentPage.set(1);
  }

  /**
   * Cambiar página
   */
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * Páginas visibles en paginación
   */
  getVisiblePages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push(-1); // Ellipsis
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push(-1);
        for (let i = total - 4; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push(-1);
        pages.push(total);
      }
    }

    return pages;
  }
}
