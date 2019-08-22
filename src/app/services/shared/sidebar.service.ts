import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'progressBar', url: '/progress' },
        { titulo: 'promesas', url: '/promesas' },
        { titulo: 'Rxjs', url: '/rxjs' },
        { titulo: 'Graficas', url: '/graficas1' }
      ]
    }
  ];
  constructor() { }
}
