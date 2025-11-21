import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-problem-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './problem-card.component.html',
  styleUrls: ['./problem-card.component.css']
})
export class ProblemCardComponent {
  @Input() iconPath = '';
  @Input() iconColor = '';
  @Input() iconBg = '';
  @Input() imageUrl = '';
  @Input() imageAlt = '';
  @Input() title = '';
  @Input() description = '';

  // Loading and error states
  imageLoaded = false;
  imageError = false;

  onImageLoad(): void {
    this.imageLoaded = true;
  }

  onImageError(): void {
    this.imageError = true;
    this.imageLoaded = false;
  }
}