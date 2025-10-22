import { Component, signal, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchBar } from '../search-bar/search-bar';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

/**
 * Componente Navbar Futurista
 * Barra de navegación con glassmorphism y efectos neón
 * Inspirado en PERMIAN y BY ALEXANDER
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SearchBar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  // Estado del menú móvil
  mobileMenuOpen = signal(false);
  
  // Estado del scroll para efectos
  isScrolled = signal(false);
  
  // Cart count
  cartItemCount = signal(0);

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    // Suscribirse a cambios en el carrito
    this.cartService.getCart().subscribe(cart => {
      this.cartItemCount.set(cart.items?.length || 0);
    });
  }

  /**
   * Detecta el scroll para aplicar efectos
   */
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled.set(scrollPosition > 50);
  }

  /**
   * Toggle del menú móvil
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((value) => !value);
  }

  /**
   * Cierra el menú móvil
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
