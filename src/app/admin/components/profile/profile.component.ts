import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  isEditing = false;

  toggleEdit(){
    this.isEditing = !this.isEditing;
  }

  formulario: FormGroup = this.fb.group({
    name: ['', ],
    last_name: ['', ],
    email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
    phone: [{value: '', disabled: true}, [Validators.required]],
  });

  constructor(private fb: FormBuilder){
  }

  editProfile() {

  }

  cancelEdit(){
    this.isEditing = false;
  }
}
