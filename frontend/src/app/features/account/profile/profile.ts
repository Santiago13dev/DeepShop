import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

/**
 * Componente Profile
 * Página de perfil del usuario
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  // Información del usuario
  user = signal({
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '+57 300 123 4567',
    avatar: 'https://ui-avatars.com/api/?name=Juan+Perez&background=4F46E5&color=fff&size=200',
  });

  // Modo edición
  isEditing = signal(false);

  // Formulario temporal
  editForm = signal({
    name: '',
    email: '',
    phone: '',
  });

  /**
   * Activar modo edición
   */
  startEditing() {
    this.editForm.set({
      name: this.user().name,
      email: this.user().email,
      phone: this.user().phone,
    });
    this.isEditing.set(true);
  }

  /**
   * Cancelar edición
   */
  cancelEditing() {
    this.isEditing.set(false);
  }

  /**
   * Guardar cambios
   */
  saveProfile() {
    this.user.set({
      ...this.user(),
      ...this.editForm(),
    });
    this.isEditing.set(false);
    alert('Perfil actualizado correctamente!');
  }

  /**
   * Cambiar avatar
   */
  changeAvatar() {
    alert('Funcionalidad de cambio de avatar - Implementar con upload de imagen');
  }
}
