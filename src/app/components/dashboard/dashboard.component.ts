import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public documents = [
    { id: 1, name: 'Asigurare RCA BMW' },
    { id: 2, name: 'Mercedes CLA asig' },
    { id: 3, name: 'Document CV' },
    { id: 4, name: 'Text Image 2' },
    { id: 5, name: 'Asigurare RCA Audi' },
    { id: 6, name: 'Document 1 - asig' },
    { id: 7, name: 'Asigurare Audi 2' },
  ];
  public toggleObject = { toggle: false };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  newPocess() {
    this.router.navigate(['/extract']);
  }
}
