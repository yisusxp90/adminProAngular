import { Injectable } from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {map} from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import {Router} from '@angular/router';
const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, public router: Router) {
    console.log('Servicio usuario');
    this.cargarStorage();
  }

  crearUsuario( usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    // regresamos este observador a cual podremos subscribirnos
    return this.http.post(url, usuario)
      .pipe(map((res: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return res.usuario;
      }));
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));

  }

  loginGoogle( token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
      .pipe( map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }

  guardarStorage( id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;

  }

  estaLogeado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  logout() {
    this.usuario = null;
    this.token= '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
