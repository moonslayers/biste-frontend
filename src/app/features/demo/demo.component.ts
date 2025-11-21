import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  // Constructor vacío - se puede agregar lógica en el futuro
}