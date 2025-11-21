import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonial-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div class="flex items-center mb-6">
        <img [src]="personImageUrl" [alt]="personName" class="w-20 h-20 rounded-full object-cover border-4 border-{{ borderColor }} mr-4">
        <div>
          <h3 class="font-bold text-xl text-gray-900">{{ personName }}</h3>
          <p class="text-{{ roleColor }} font-medium">{{ role }}</p>
          <div class="flex text-yellow-400">
            <!-- 5 star rating -->
            <svg class="w-5 h-5 fill-current" viewBox="0 0 20 20" *ngFor="let star of [].constructor(5)">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
        </div>
      </div>
      <blockquote class="text-gray-700 mb-6 italic text-lg leading-relaxed">
        "{{ testimonial }}"
      </blockquote>
      <div class="flex items-center text-sm text-gray-500">
        <svg class="w-4 h-4 mr-2 text-{{ locationColor }}" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
        </svg>
        {{ location }}
      </div>
    </div>
  `
})
export class TestimonialCardComponent {
  @Input() personImageUrl = '';
  @Input() personName = '';
  @Input() role = '';
  @Input() roleColor = '';
  @Input() borderColor = '';
  @Input() testimonial = '';
  @Input() location = '';
  @Input() locationColor = '';
}