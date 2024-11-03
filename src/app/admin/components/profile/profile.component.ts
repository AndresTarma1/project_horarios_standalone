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

  isEditing = false;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario con datos simulados
    this.profileForm = this.fb.group({
      name: ['Admin User'],
      email: ['admin@example.com'],
      role: ['Administrador']
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    if (this.profileForm.valid) {
      this.isEditing = false;
      // Aquí iría la lógica para guardar los cambios
      console.log('Perfil actualizado:', this.profileForm.value);
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.profileForm.reset({
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Administrador'
    });
  }
}
