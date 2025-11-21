import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { ProblemCardComponent } from '../../shared/components/problem-card/problem-card.component';
import { FeatureCardComponent } from '../../shared/components/feature-card/feature-card.component';
import { TestimonialCardComponent } from '../../shared/components/testimonial-card/testimonial-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LogoComponent, ProblemCardComponent, FeatureCardComponent, TestimonialCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}