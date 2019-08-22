import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then( (mensaje) => {
      console.log('temino !', mensaje);
    }).catch( error => {
      console.error(error);
    });
  }

  ngOnInit() {
  }

  contarTres() {
    const promesa = new Promise( (resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;
        if ( contador === 3) {
          resolve('ok !!');
          clearInterval(intervalo);
        }
      }, 1000 );
    });

    return promesa;
  }

}
