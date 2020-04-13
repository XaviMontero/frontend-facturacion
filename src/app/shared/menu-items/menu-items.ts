import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'my-line-chart', type: 'link', name: 'Mapa ', icon: 'crop_7_5' },
  { state: 'button', type: 'link', name: 'Conparativa', icon: 'crop_7_5' },
   
  {
    state: 'expansion',
    type: 'link',
    name: 'Tu Comparativa',
    icon: 'vertical_align_center'
  } 
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
