import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Chart, registerables } from 'chart.js';

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

// Interfaces para TypeScript
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface InventoryItem {
  id: number;
  product: string;
  quantity: number;
  unit: string;
  price: number;
  entryDate: string;
  provider: string;
  location: string;
  batch: string;
  status: 'critical' | 'normal' | 'optimal';
  category: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  activeSection: 'dashboard' | 'pos' | 'inventory' = 'dashboard';

  // Charts
  monthlyIngressChart: Chart | null = null;
  salesChart: Chart | null = null;
  productSalesChart: Chart | null = null;
  subproductChart: Chart | null = null;

  // POS Data
  cartItems: CartItem[] = [];

  // Inventory Data
  inventoryData: InventoryItem[] = [
    { id: 1, product: 'Arrachera', quantity: 125, unit: 'kg', price: 189, entryDate: '2024-01-15', provider: 'Carnes Premium', location: 'Cámara 1-A', batch: 'ARR-2024-0115', status: 'optimal', category: 'cortes' },
    { id: 2, product: 'Picanha', quantity: 45, unit: 'kg', price: 220, entryDate: '2024-01-14', provider: 'Carnes Premium', location: 'Cámara 1-B', batch: 'PIC-2024-0114', status: 'normal', category: 'cortes' },
    { id: 3, product: 'Suadero', quantity: 8, unit: 'kg', price: 95, entryDate: '2024-01-13', provider: 'Procesadora del Norte', location: 'Cámara 2-A', batch: 'SUA-2024-0113', status: 'critical', category: 'cortes' },
    { id: 4, product: 'Sirloin', quantity: 89, unit: 'kg', price: 175, entryDate: '2024-01-15', provider: 'Carnes Selectas', location: 'Cámara 1-C', batch: 'SIR-2024-0115', status: 'optimal', category: 'cortes' },
    { id: 5, product: 'Costilla', quantity: 156, unit: 'kg', price: 120, entryDate: '2024-01-14', provider: 'Procesadora del Norte', location: 'Cámara 2-B', batch: 'COS-2024-0114', status: 'optimal', category: 'cortes' },
    { id: 6, product: 'Lomillo', quantity: 34, unit: 'kg', price: 195, entryDate: '2024-01-16', provider: 'Carnes Premium', location: 'Cámara 1-A', batch: 'LOM-2024-0116', status: 'normal', category: 'cortes' },
    { id: 7, product: 'Bola', quantity: 78, unit: 'kg', price: 85, entryDate: '2024-01-15', provider: 'Carnes Selectas', location: 'Cámara 2-C', batch: 'BOL-2024-0115', status: 'normal', category: 'cortes' },
    { id: 8, product: 'Chorizo', quantity: 92, unit: 'kg', price: 65, entryDate: '2024-01-13', provider: 'Embutidos del Valle', location: 'Refrigerador 1', batch: 'CHO-2024-0113', status: 'normal', category: 'embutidos' },
    { id: 9, product: 'Longaniza', quantity: 67, unit: 'kg', price: 70, entryDate: '2024-01-14', provider: 'Embutidos del Valle', location: 'Refrigerador 2', batch: 'LON-2024-0114', status: 'normal', category: 'embutidos' },
    { id: 10, product: 'Morrón', quantity: 12, unit: 'kg', price: 45, entryDate: '2024-01-16', provider: 'Embutidos del Valle', location: 'Refrigerador 1', batch: 'MOR-2024-0116', status: 'critical', category: 'embutidos' },
  ];

  filteredInventory: InventoryItem[] = [...this.inventoryData];
  products: Product[] = [
    { id: 1, name: 'Arrachera', price: 189, category: 'cortes', image: '🥩' },
    { id: 2, name: 'Picanha', price: 220, category: 'cortes', image: '🥩' },
    { id: 3, name: 'Suadero', price: 95, category: 'cortes', image: '🥩' },
    { id: 4, name: 'Sirloin', price: 175, category: 'cortes', image: '🥩' },
    { id: 5, name: 'Costilla', price: 120, category: 'cortes', image: '🍖' },
    { id: 6, name: 'Lomillo', price: 195, category: 'cortes', image: '🥩' },
    { id: 7, name: 'Bola', price: 85, category: 'cortes', image: '🥩' },
    { id: 8, name: 'Chorizo', price: 65, category: 'embutidos', image: '🌭' },
    { id: 9, name: 'Longaniza', price: 70, category: 'embutidos', image: '🌭' },
    { id: 10, name: 'Morrón', price: 45, category: 'embutidos', image: '🌭' },
  ];

  inventoryFilters = {
    search: '',
    category: '',
    status: ''
  };

  ngOnInit() {
    // Esperar a que la vista se renderice completamente
    setTimeout(() => {
      this.initializeCharts();
    }, 500);
  }

  // Navigation
  switchSection(section: 'dashboard' | 'pos' | 'inventory') {
    this.activeSection = section;
    if (section === 'dashboard') {
      // Esperar a que la sección se renderice
      setTimeout(() => {
        this.initializeCharts();
      }, 100);
    }
  }

  // Charts initialization
  initializeCharts() {
    // Destruir gráficas existentes para evitar duplicados
    this.destroyCharts();

    // Pequeña espera para asegurar que los elementos DOM existan
    setTimeout(() => {
      this.createMonthlyIngressChart();
      this.createSalesChart();
      this.createProductSalesChart();
      this.createSubproductChart();
    }, 100);
  }

  // Destroy existing charts
  destroyCharts() {
    if (this.monthlyIngressChart) {
      this.monthlyIngressChart.destroy();
      this.monthlyIngressChart = null;
    }
    if (this.salesChart) {
      this.salesChart.destroy();
      this.salesChart = null;
    }
    if (this.productSalesChart) {
      this.productSalesChart.destroy();
      this.productSalesChart = null;
    }
    if (this.subproductChart) {
      this.subproductChart.destroy();
      this.subproductChart = null;
    }
  }

  createMonthlyIngressChart() {
    try {
      const canvas = document.getElementById('monthlyIngressChart') as HTMLCanvasElement;
      if (!canvas) {
        console.error('Canvas element not found: monthlyIngressChart');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get 2D context for monthlyIngressChart');
        return;
      }

      this.monthlyIngressChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [{
            label: 'Kilos Ingresados',
            data: [1200, 1450, 1380, 1650, 1890, 2100],
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { color: '#f1f5f9' }
            }
          },
          scales: {
            x: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148, 163, 184, 0.1)' } },
            y: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148, 163, 184, 0.1)' } }
          }
        }
      });
      console.log('Monthly Ingress Chart created successfully');
    } catch (error) {
      console.error('Error creating monthly ingress chart:', error);
    }
  }

  createSalesChart() {
    try {
      const canvas = document.getElementById('salesChart') as HTMLCanvasElement;
      if (!canvas) {
        console.error('Canvas element not found: salesChart');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get 2D context for salesChart');
        return;
      }

      this.salesChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [{
            label: 'Kilos Vendidos',
            data: [980, 1120, 1250, 1380, 1520, 1680],
            backgroundColor: 'rgba(249, 115, 22, 0.8)',
            borderColor: 'rgb(249, 115, 22)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { color: '#f1f5f9' }
            }
          },
          scales: {
            x: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148, 163, 184, 0.1)' } },
            y: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(148, 163, 184, 0.1)' } }
          }
        }
      });
      console.log('Sales Chart created successfully');
    } catch (error) {
      console.error('Error creating sales chart:', error);
    }
  }

  createProductSalesChart() {
    try {
      const canvas = document.getElementById('productSalesChart') as HTMLCanvasElement;
      if (!canvas) {
        console.error('Canvas element not found: productSalesChart');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get 2D context for productSalesChart');
        return;
      }

      this.productSalesChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Arrachera', 'Picanha', 'Suadero', 'Sirloin', 'Otros'],
          datasets: [{
            data: [320, 280, 180, 240, 160],
            backgroundColor: [
              'rgba(239, 68, 68, 0.8)',
              'rgba(249, 115, 22, 0.8)',
              'rgba(251, 191, 36, 0.8)',
              'rgba(245, 158, 11, 0.8)',
              'rgba(217, 119, 6, 0.8)'
            ],
            borderColor: [
              'rgb(239, 68, 68)',
              'rgb(249, 115, 22)',
              'rgb(251, 191, 36)',
              'rgb(245, 158, 11)',
              'rgb(217, 119, 6)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: { color: '#f1f5f9' }
            }
          }
        }
      });
      console.log('Product Sales Chart created successfully');
    } catch (error) {
      console.error('Error creating product sales chart:', error);
    }
  }

  createSubproductChart() {
    try {
      const canvas = document.getElementById('subproductChart') as HTMLCanvasElement;
      if (!canvas) {
        console.error('Canvas element not found: subproductChart');
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Could not get 2D context for subproductChart');
        return;
      }

      this.subproductChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Chorizo', 'Longaniza', 'Morrón', 'Jamón', 'Otros'],
          datasets: [{
            data: [220, 180, 120, 90, 60],
            backgroundColor: [
              'rgba(185, 28, 28, 0.8)',
              'rgba(194, 65, 12, 0.8)',
              'rgba(217, 70, 239, 0.8)',
              'rgba(154, 52, 18, 0.8)',
              'rgba(127, 29, 29, 0.8)'
            ],
            borderColor: [
              'rgb(185, 28, 28)',
              'rgb(194, 65, 12)',
              'rgb(217, 70, 239)',
              'rgb(154, 52, 18)',
              'rgb(127, 29, 29)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: { color: '#f1f5f9' }
            }
          }
        }
      });
      console.log('Subproduct Chart created successfully');
    } catch (error) {
      console.error('Error creating subproduct chart:', error);
    }
  }

  updateCharts() {
    if (this.activeSection === 'dashboard') {
      setTimeout(() => {
        this.monthlyIngressChart?.update();
        this.salesChart?.update();
        this.productSalesChart?.update();
        this.subproductChart?.update();
      }, 100);
    }
  }

  // POS Methods
  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      const item = this.cartItems.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    }
  }

  getCartTotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart() {
    this.cartItems = [];
  }

  // Inventory Methods
  filterInventory() {
    this.filteredInventory = this.inventoryData.filter(item => {
      const matchesSearch = item.product.toLowerCase().includes(this.inventoryFilters.search.toLowerCase()) ||
                           item.provider.toLowerCase().includes(this.inventoryFilters.search.toLowerCase());
      const matchesCategory = !this.inventoryFilters.category || item.category === this.inventoryFilters.category;
      const matchesStatus = !this.inventoryFilters.status || item.status === this.inventoryFilters.status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'critical': return 'bg-red-600 text-white';
      case 'normal': return 'bg-orange-600 text-white';
      case 'optimal': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  }
}