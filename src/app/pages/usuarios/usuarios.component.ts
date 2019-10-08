import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {UsuarioService} from '../../services/service.index';
declare var swal: any;
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public usuarioService: UsuarioService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
      .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {

    this.modalUploadService.mostrarModal( 'usuarios', id );
  }

  cargarUsuarios() {

    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde).subscribe( (resp: any) => {
      console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario(termino: string) {

    this.cargando = true;
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    this.usuarioService.buscarUsuario(termino).subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario) {

    if (usuario._id === this.usuarioService.usuario._id) {
      swal('No puede borrar usuario', 'No puede borrar el usuario con el que esta logeado', 'error');
      return;
    }

    swal({
      title: '¿esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      if (borrar) {
        this.usuarioService.borrarUsuario(usuario._id).subscribe( borrado => {
          console.log(borrado);
          this.cargarUsuarios();
        });
      }
    });

  }

  guardarUsuario(usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
