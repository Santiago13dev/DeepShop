import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente para mostrar los Términos y Condiciones de Deepshop
 */
@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms.html',
  styleUrl: './terms.css',
})
export class Terms {}
