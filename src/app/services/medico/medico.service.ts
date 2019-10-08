import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {map} from 'rxjs/operators';
declare var swal: any;
import {Medico} from '../../models/medico.model';
import {UsuarioService} from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;
  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico/';
    return this.http.get(url).pipe( map( (resp: any) => {
      this.totalMedicos = resp.total;
      return resp.medicos;
    }));
  }

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id ;
    return this.http.get(url).pipe( map( (resp: any) => {
      return resp.medico;
    }));
  }

  borrarMedico( id: string) {
    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this.usuarioService.token;
    return this.http.delete(url).pipe( map( (resp: any) => {
      swal('Medico Borrado', 'Eliminado correctamente', 'success');
    }));
  }

  guardarMedico( medico: Medico) {
    const url = URL_SERVICIOS + '/medico/?token=' + this.usuarioService.token;
    return this.http.post(url, medico).pipe( map( (resp: any) => {
      swal('Medico Registrado', medico.nombre, 'success');
      return resp.medico;
    }));
  }

  buscarMedico( termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get(url).pipe( map( (resp: any) => {
      return resp.medicos;
    }));
  }

  actualizarMedico( medico: Medico) {
    const url = URL_SERVICIOS + '/medico/' + medico._id + '?token=' + this.usuarioService.token;
    return this.http.put(url, medico).pipe( map( (resp: any) => {
      swal('Medico Actualizado', medico.nombre, 'success');
      return resp.medicos;
    }));
  }

}
