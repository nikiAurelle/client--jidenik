import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  articles: { [key: string]: any }[] = [
  { image: 1, description: 'Produit 1', prix: 10.99 },
  { image: 1, description: 'Produit 1', prix: 10.99 },
  { image: 1, description: 'Produit 1', prix: 10.99 },
  { image: 1, description: 'Produit 1', prix: 10.99 },
  { image: 1, description: 'Produit 1', prix: 10.99 },
  { image: 1, description: 'Produit 1', prix: 10.99 },
  { image: 1, description: 'Produit 1', prix: 10.99 },
  { image: 1, description: 'Produit 1', prix: 10.99 },
  ];
    categories: string[] = ['Robes',
    'Pantalons',
    'Chaussures',
    'Ordinateurs',
    'T-shirts',
      'Pantalons',
    'Chaussures',
    'Ordinateurs',
    'T-shirts',
  ]
  articlesPopulaires: { [key: string]: any }[] = [
  { image: 1, description: 'Produit 1', prix: 10.99 },
  { image: 1, description: 'Produit 1', prix: 10.99 },
  { image: 1, description: 'Produit 1', prix: 10.99 },
  ];
  marques: string[] = ['LV', 'GIF', 'JS', 'World'];
}
