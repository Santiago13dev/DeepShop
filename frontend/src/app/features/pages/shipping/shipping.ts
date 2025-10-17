import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente para mostrar la información de Envíos de Deepshop
 */
@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shipping.html',
  styleUrl: './shipping.css',
})
export class Shipping {}
