import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;
import {UsuarioService} from '../services/service.index';
import {Usuario} from '../models/usuario.model';
import {Router} from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor( public usuarioService: UsuarioService, public router: Router) { }

  // usamos ReactiveForms para hacer esto se debe importar en el module.ts
  ngOnInit() {
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      repetirPassword: new FormControl(null, [Validators.required]),
      condiciones: new FormControl(false)
    }, {validators: this.sonIguales( 'password', 'repetirPassword')});

    this.forma.setValue({
      nombre: 'Jesus',
      email: 'yisusxp90@gmail.com',
      password: '123456',
      repetirPassword: '123456',
      condiciones: true
    });
  }

  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {
      const valor1 = group.controls[campo1].value;
      const valor2 = group.controls[campo2].value;
      if ( valor1 === valor2 ) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }
  registrarUsuario() {

    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      console.log('Debe aceptar las condiciones');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario(usuario)
      .subscribe( resp => {
        console.log(resp);
        this.router.navigate(['/login']);
      });
  }

}
