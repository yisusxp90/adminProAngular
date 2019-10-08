import { Injectable } from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SubirArchivoService} from '../subir-archivo/subir-archivo.service';
declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: any;
  token: string;

  constructor( public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) {
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
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  actualizarUsuario( usuario: Usuario) {

    const id = localStorage.getItem('id');
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.put(url, usuario)
      .pipe(map( (resp: any) => {
        if (usuario.id === this.usuario.id) {
          const usuarioDB = resp.usuario;
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        }
        swal('Usuario Actualizado', this.usuario.nombre, 'success');
        return true;
      }));

  }

  cambiarImagen( archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios/', id)
      .then( (resp: any) => {
        console.log(resp);
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      }).catch(resp => {
        console.log(resp);
    });
  }

  cargarUsuarios(desde: number = 0) {

    const url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);

  }

  buscarUsuario(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.usuarios));
  }

  borrarUsuario( id: string) {
    const url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url).pipe(map( resp => {
      swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
      return true;
    }));
  }
}
