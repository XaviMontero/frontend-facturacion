import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Facturas', type: 'link', icon: 'av_timer' },
  { state: 'retenciones', type: 'link', name: 'Retenciones ', icon: 'crop_7_5' },
  {
    state: 'expansion',
    type: 'link',
    name: 'Contadores',
    icon: 'vertical_align_center'
  } 
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
