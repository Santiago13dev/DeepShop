import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Componente Footer
 * Pie de página con enlaces y redes sociales
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  // Redes sociales
  socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
  ];
}
