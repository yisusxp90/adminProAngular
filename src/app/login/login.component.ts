import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UsuarioService} from '../services/service.index';
import {Usuario} from '../models/usuario.model';

declare const gapi: any;
declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor( public router: Router, public usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || ''; // si viene el valor lo coloca sino (||) coloca vacio
    if(this.email.length > 1) {
      this.recuerdame = true;
    }
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '209885421627-ke69bgp5ijv2oatvanba7he1mvaid22a.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn( document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      // console.log(profile);
      const token = googleUser.getAuthResponse().id_token;
      console.log(token);
      this.usuarioService.loginGoogle(token)
        .subscribe( resp => {
          // console.log(resp);
          // this.router.navigate(['/dashboard']);
          window.location.href = '#/dashboard';
        });
    });
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) { return true;}

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this.usuarioService.login(usuario, forma.value.recuerdame).subscribe( correcto => {
      console.log(correcto);
      this.router.navigate(['/dashboard']);
      // window.location.href = '#/dashboard';
    });
    console.log(forma.valid);
    console.log(forma.value);
    // this.router.navigate(['/dashboard']);
  }



}
