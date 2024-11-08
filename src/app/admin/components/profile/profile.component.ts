import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  admin = {
    name: 'Juan',
    lastName: 'Pérez',
    identify: '12345678',
    department: 'Recursos Humanos',
    email: 'juan.perez@example.com',
    phone: '+123456789',
    role: 'Administrador',
    permissions: ['Crear usuarios', 'Editar configuraciones', 'Ver reportes']
  };

  recentActivities = [
    { date: '2024-11-01', description: 'Accedió a la configuración del sistema' },
    { date: '2024-11-03', description: 'Actualizó el perfil de usuario' },
    { date: '2024-11-05', description: 'Generó un reporte de actividad' }
  ];

  editProfile() {
    // Lógica para editar el perfil
  }
}
