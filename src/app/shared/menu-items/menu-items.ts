import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Facturas', type: 'link', icon: 'assessment' },
  { state: 'retenciones', type: 'link', name: 'Retenciones ', icon: 'book' },
  {
    state: 'contadores-facturas',
    type: 'link',
    name: 'Contadores Facturas',
    icon: 'business_center'
  } ,
  {
    state:'contadores-retenciones',
    type: 'link',
    name: 'Contadores Retenci..',
    icon: 'business_center'
  } 
  
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
