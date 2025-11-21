import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-{{ bgColor }} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group">
      <div class="overflow-hidden rounded-xl mb-6 relative h-64 cursor-pointer group-hover:scale-105 transition-transform duration-300">
        <img [src]="imageUrl" [alt]="imageAlt" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute inset-0 bg-gradient-to-t from-{{ overlayColor }}/60 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-{{ overlayColor }}/80 to-transparent">
          <div class="bg-white rounded-xl p-3 inline-block">
            <svg class="w-6 h-6 text-{{ iconColor }}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="iconPath"></path>
            </svg>
          </div>
          <h3 class="text-white font-bold text-lg">{{ title }}</h3>
        </div>
      </div>
      <div class="mt-4">
        <p class="text-{{ subtitleColor }} font-semibold text-lg mb-2">{{ subtitle }}</p>
        <p class="text-gray-600 mb-4">{{ description }}</p>
        <div class="bg-green-100 rounded-lg p-3">
          <p class="text-green-800 font-semibold text-sm">
            ✅ Beneficio: {{ benefit }}
          </p>
        </div>
      </div>
    </div>
  `
})
export class FeatureCardComponent {
  @Input() bgColor = '';
  @Input() imageUrl = '';
  @Input() imageAlt = '';
  @Input() overlayColor = '';
  @Input() iconColor = '';
  @Input() iconPath = '';
  @Input() title = '';
  @Input() subtitleColor = '';
  @Input() subtitle = '';
  @Input() description = '';
  @Input() benefit = '';
}