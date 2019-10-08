import { Pipe, PipeTransform } from '@angular/core';
import {URL_SERVICIOS} from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {

    let url = URL_SERVICIOS + '/imagenes';

    if (!img) {
      console.log('sin imagen');
      return url + '/usuarios/xxx'; // imagen por defecto del servicio
    }

    if ( img.indexOf('https') >= 0) { // imagen de google
      return img;
    }

    // sino es de google pueden ser 3 tipos de imagenes: usuarios, medicos o hospitales

    switch ( tipo ) {

      case 'usuarios':
        url += '/usuarios/' + img;
        break;

      case 'medicos':
        url += '/medicos/' + img;
        break;

      case 'hospitales':
        url += '/hospitales/' + img;
        console.log(url);
        break;

      default:
        console.log('Tipo de imagen no existe, usuario, medicos, hospitales');
        url += '/usuarios/xxx';
    }

    return url;
  }

}
