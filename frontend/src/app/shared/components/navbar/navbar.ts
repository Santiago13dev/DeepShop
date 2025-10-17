import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SearchBar } from '../search-bar/search-bar';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

/**
 * Componente Navbar
 * Barra de navegación principal con búsqueda y carrito
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SearchBar],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  // Estado del menú móvil
  mobileMenuOpen = signal(false);

  constructor(
    public cartService: CartService,
    public wishlistService: WishlistService
  ) {}

  /**
   * Toggle del menú móvil
   */
  toggleMobileMenu() {
    this.mobileMenuOpen.update((value) => !value);
  }
}
