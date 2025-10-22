import { Injectable, inject } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * Interfaz para la estructura de una categoría
 */
export interface Category {
  id?: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  count?: number;
  parent_id?: number | null;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Servicio para manejar las categorías de productos
 * Maneja la carga, caché y gestión de categorías
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);
  
  // URL base de la API
  private apiUrl = `${environment.apiUrl}/categories`;
  
  // Caché de categorías
  private categoriesCache$ = new BehaviorSubject<Category[]>([]);
  private cacheTimestamp: number | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos en milisegundos
  
  // Estado de carga
  private loading$ = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadMockCategories(); // Carga categorías mock inicial
  }

  /**
   * Obtiene todas las categorías
   * Usa caché si está disponible y válido
   */
  getAllCategories(): Observable<Category[]> {
    // Si hay caché válido, devolver del caché
    if (this.isCacheValid() && this.categoriesCache$.value.length > 0) {
      console.log('📦 Usando categorías desde caché');
      return of(this.categoriesCache$.value);
    }

    // Si no hay caché o expiró, cargar desde API
    console.log('🌐 Cargando categorías desde el servidor');
    this.loading$.next(true);

    return this.http.get<Category[]>(this.apiUrl).pipe(
      map(categories => categories.filter(cat => cat.active !== false)),
      tap(categories => {
        console.log('✅ Categorías cargadas exitosamente:', categories.length);
        this.updateCache(categories);
        this.loading$.next(false);
      }),
      catchError(error => {
        console.error('❌ Error al cargar categorías desde el servidor:', error);
        this.loading$.next(false);
        
        // Si falla, devolver categorías mock
        console.log('📝 Usando categorías mock como fallback');
        const mockCategories = this.getMockCategories();
        this.updateCache(mockCategories);
        return of(mockCategories);
      })
    );
  }

  /**
   * Obtiene una categoría por su slug
   */
  getCategoryBySlug(slug: string): Observable<Category | null> {
    return this.getAllCategories().pipe(
      map(categories => categories.find(cat => cat.slug === slug) || null),
      catchError(error => {
        console.error(`❌ Error al buscar categoría con slug "${slug}":`, error);
        return of(null);
      })
    );
  }

  /**
   * Obtiene las categorías principales (sin padre)
   */
  getMainCategories(): Observable<Category[]> {
    return this.getAllCategories().pipe(
      map(categories => categories.filter(cat => !cat.parent_id))
    );
  }

  /**
   * Obtiene las subcategorías de una categoría padre
   */
  getSubcategories(parentId: number): Observable<Category[]> {
    return this.getAllCategories().pipe(
      map(categories => categories.filter(cat => cat.parent_id === parentId))
    );
  }

  /**
   * Busca categorías por nombre o descripción
   */
  searchCategories(searchTerm: string): Observable<Category[]> {
    if (!searchTerm.trim()) {
      return of([]);
    }

    return this.getAllCategories().pipe(
      map(categories => 
        categories.filter(cat => 
          cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  /**
   * Observable del estado de carga
   */
  isLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  /**
   * Observable de las categorías en caché
   */
  getCachedCategories(): Observable<Category[]> {
    return this.categoriesCache$.asObservable();
  }

  /**
   * Invalida el caché forzando una recarga en la próxima petición
   */
  invalidateCache(): void {
    this.cacheTimestamp = null;
    this.categoriesCache$.next([]);
    console.log('🗑️ Caché de categorías invalidado');
  }

  /**
   * Refresca las categorías forzando una nueva carga desde el servidor
   */
  refreshCategories(): Observable<Category[]> {
    this.invalidateCache();
    return this.getAllCategories();
  }

  /**
   * Actualiza el caché con nuevas categorías
   */
  private updateCache(categories: Category[]): void {
    this.categoriesCache$.next(categories);
    this.cacheTimestamp = Date.now();
    console.log('💾 Caché de categorías actualizado');
  }

  /**
   * Verifica si el caché es válido
   */
  private isCacheValid(): boolean {
    if (!this.cacheTimestamp) {
      return false;
    }

    const now = Date.now();
    const isValid = (now - this.cacheTimestamp) < this.CACHE_DURATION;
    
    if (!isValid) {
      console.log('⏰ Caché de categorías expirado');
    }
    
    return isValid;
  }

  /**
   * Carga categorías mock para desarrollo
   */
  private loadMockCategories(): void {
    const mockCategories = this.getMockCategories();
    this.updateCache(mockCategories);
  }

  /**
   * Obtiene categorías de ejemplo para desarrollo y fallback
   */
  private getMockCategories(): Category[] {
    return [
      {
        id: 1,
        slug: 'electronics',
        name: 'Electrónica',
        description: 'Smartphones, laptops, tablets y accesorios tecnológicos',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=600&fit=crop',
        count: 156,
        active: true
      },
      {
        id: 2,
        slug: 'fashion',
        name: 'Moda',
        description: 'Ropa, calzado y accesorios de las mejores marcas',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
        count: 234,
        active: true
      },
      {
        id: 3,
        slug: 'home',
        name: 'Hogar',
        description: 'Muebles, decoración y artículos para el hogar',
        image: 'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=600&fit=crop',
        count: 189,
        active: true
      },
      {
        id: 4,
        slug: 'sports',
        name: 'Deportes',
        description: 'Equipamiento y ropa deportiva para todas las disciplinas',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
        count: 167,
        active: true
      },
      {
        id: 5,
        slug: 'books',
        name: 'Libros',
        description: 'Ficción, no ficción, educativos y más',
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600&fit=crop',
        count: 421,
        active: true
      },
      {
        id: 6,
        slug: 'toys',
        name: 'Juguetes',
        description: 'Juguetes y juegos para todas las edades',
        image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&h=600&fit=crop',
        count: 203,
        active: true
      },
      {
        id: 7,
        slug: 'beauty',
        name: 'Belleza',
        description: 'Cosméticos, cuidado personal y perfumería',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
        count: 178,
        active: true
      },
      {
        id: 8,
        slug: 'garden',
        name: 'Jardín',
        description: 'Herramientas y accesorios para tu jardín',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop',
        count: 145,
        active: true
      }
    ];
  }

  // ========================================
  // MÉTODOS PARA ADMINISTRACIÓN (CRUD)
  // ========================================

  /**
   * Crea una nueva categoría (solo para administradores)
   */
  createCategory(category: Partial<Category>): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category).pipe(
      tap(() => {
        console.log('✅ Categoría creada exitosamente');
        this.invalidateCache();
      }),
      catchError(error => {
        console.error('❌ Error al crear categoría:', error);
        throw error;
      })
    );
  }

  /**
   * Actualiza una categoría existente (solo para administradores)
   */
  updateCategory(id: number, category: Partial<Category>): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category).pipe(
      tap(() => {
        console.log('✅ Categoría actualizada exitosamente');
        this.invalidateCache();
      }),
      catchError(error => {
        console.error(`❌ Error al actualizar categoría ${id}:`, error);
        throw error;
      })
    );
  }

  /**
   * Elimina una categoría (solo para administradores)
   */
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        console.log('✅ Categoría eliminada exitosamente');
        this.invalidateCache();
      }),
      catchError(error => {
        console.error(`❌ Error al eliminar categoría ${id}:`, error);
        throw error;
      })
    );
  }
}
