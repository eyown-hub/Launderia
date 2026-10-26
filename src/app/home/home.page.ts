import { Component, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

type Page = 'home' | 'services' | 'estimate' | 'visit';
interface MenuItem { name: string; note: string; price: number; }
interface EstItem { name: string; unit: string; price: number; qty: number; }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  @ViewChild(IonContent) content?: IonContent;

  page: Page = 'home';
  navItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Service menu' },
    { id: 'estimate', label: 'Price estimator' },
    { id: 'visit', label: 'Visit us' },
  ];

  // Estimated prices lang po to  walang price list online so..
  menu: Record<string, MenuItem[]> = {
    'Wash, dry & fold': [
      { name: 'Regular clothes', note: 'per kg, min. 3 kg', price: 50 },
      { name: 'Whites & light colors', note: 'per kg, washed separately', price: 55 },
      { name: 'Delicates', note: 'per kg, gentle cycle', price: 70 },
    ],
    'Self-service': [
      { name: 'Wash', note: 'per 8 kg load', price: 70 },
      { name: 'Dry', note: 'per 8 kg load, 30 min', price: 60 },
      { name: 'Detergent & fabric softener', note: 'per set', price: 15 },
    ],
    'Bedding & bulky': [
      { name: 'Bed sheet set', note: 'per set', price: 120 },
      { name: 'Comforter, single/double', note: 'per piece', price: 200 },
      { name: 'Comforter, queen/king', note: 'per piece', price: 250 },
      { name: 'Curtains', note: 'per kg', price: 65 },
    ],
    'Dry cleaning': [
      { name: 'Shirt or blouse', note: 'per piece', price: 90 },
      { name: 'Pants or skirt', note: 'per piece', price: 100 },
      { name: 'Suit, 2-piece', note: 'per set', price: 300 },
      { name: 'Dress or gown', note: 'per piece', price: 250 },
    ],
    'Add-ons': [
      { name: 'Express 3-hour turnaround', note: 'flat add-on', price: 40 },
      { name: 'Pickup and delivery', note: 'per trip', price: 60 },
      { name: 'Ironing', note: 'per kg', price: 35 },
    ],
  };
  categories = Object.keys(this.menu);
  category = this.categories[0];

  popular = [
    { name: 'Wash, dry & fold (per kg)', price: '₱50' },
    { name: 'Self-service wash (8 kg)', price: '₱70' },
    { name: 'Self-service dry (8 kg)', price: '₱60' },
    { name: 'Comforter, queen', price: '₱250' },
    { name: 'Express 3-hour add-on', price: '+₱40' },
  ];

  steps = [
    { title: 'Bring your laundry', text: 'Drop it at the counter or book a pickup.' },
    { title: 'We weigh and sort', text: 'Whites, colors, and delicates are washed separately.' },
    { title: 'Wash, dry, fold', text: 'Done in about 24 hours, or 3 hours with Express.' },
    { title: 'Pick up or get delivery', text: 'Folded, bagged, and ready to go.' },
  ];

  items: EstItem[] = [
    { name: 'Wash, dry & fold', unit: 'per kg', price: 50, qty: 0 },
    { name: 'Bed sheet set', unit: 'per set', price: 120, qty: 0 },
    { name: 'Comforter, queen/king', unit: 'per piece', price: 250, qty: 0 },
    { name: 'Shirt or blouse (dry clean)', unit: 'per piece', price: 90, qty: 0 },
    { name: 'Pants or skirt (dry clean)', unit: 'per piece', price: 100, qty: 0 },
    { name: 'Suit, 2-piece (dry clean)', unit: 'per set', price: 300, qty: 0 },
  ];
  express = false;
  delivery = false;

  go(p: Page) {
    this.page = p;
    this.content?.scrollToTop(0);
  }

  change(item: EstItem, d: number) { item.qty = Math.max(0, item.qty + d); }

  get base(): number { return this.items.reduce((s, i) => s + i.price * i.qty, 0); }
  get total(): number {
    if (!this.base) return 0;
    return this.base + (this.express ? 40 : 0) + (this.delivery ? 60 : 0);
  }
}