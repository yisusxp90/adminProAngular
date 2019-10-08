import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HospitalService, MedicoService, SettingsService, SharedService, SidebarService, SubirArchivoService} from './service.index';
import {UsuarioService} from './usuario/usuario.service';
import {HttpClientModule} from '@angular/common/http';
import {ModalUploadService} from '../components/modal-upload/modal-upload.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    HospitalService,
    ModalUploadService,
    MedicoService
  ]
})
export class ServiceModule { }
