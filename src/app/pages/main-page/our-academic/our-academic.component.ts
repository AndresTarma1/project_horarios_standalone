import { HttpClient } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminService } from '../../../core/services/admin-service.service';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-our-academic',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  templateUrl: './our-academic.component.html',
  styleUrl: './our-academic.component.css'
})
export default class OurAcademicComponent implements OnInit {


  private adminService = inject(AdminService);

  constructor(){
  }

  ngOnInit(): void {
  }

}
