import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscriber, Subscription} from 'rxjs';
import {filter, map, retry} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObserble()/*.pipe( retry(2) )*/.subscribe(numero => {
      console.log('subs ', numero);
    }, error => {
      console.log(error);
    }, () => {
      console.log('El observador termino');
    });

  }

  ngOnInit() {
  }


  ngOnDestroy(): void {
    // se ejecuta al dejar la pagina
    this.subscription.unsubscribe();
  }

  regresaObserble(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval( () => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);
        /*if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        }

        if ( contador === 2) {
          clearInterval(intervalo);
          observer.error('Error provocado');
        }*/
      }, 1000);
    }).pipe( map( (resp) => {
      return resp.valor;
    }),
      filter( (resp, index) => {
        if ( (resp % 2) === 1 ) {
          return true;
        } else {
          return false;
        }
      }));

  }

}
