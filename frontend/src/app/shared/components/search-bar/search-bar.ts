import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Componente SearchBar
 * Barra de búsqueda con sugerencias
 */
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  searchQuery = signal('');
  showSuggestions = signal(false);

  suggestions = [
    'iPhone 15 Pro',
    'MacBook Air M2',
    'AirPods Pro',
    'iPad Air',
    'Apple Watch Series 9',
  ];

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery.set(query);
    this.showSuggestions.set(query.length > 0);
  }

  selectSuggestion(suggestion: string) {
    this.searchQuery.set(suggestion);
    this.showSuggestions.set(false);
    // Aquí iría la lógica de búsqueda
    console.log('Buscando:', suggestion);
  }
}
