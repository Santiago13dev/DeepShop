import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Layout de Administración
 * Layout con sidebar para panel admin
 */
@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {}
