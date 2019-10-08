import { Component, OnInit } from '@angular/core';
import {Medico} from '../../models/medico.model';
import {MedicoService} from '../../services/medico/medico.service';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  constructor(public medicosService: MedicoService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarMedicos();
    this.modalUploadService.notificacion.subscribe(() => this.cargarMedicos());
  }

  cargarMedicos() {
    this.medicosService.cargarMedicos()
      .subscribe(medicos => {
        this.medicos = medicos;
      });
  }

  borrarMedico(medico: Medico) {
    this.medicosService.borrarMedico(medico._id)
      .subscribe( () => {
        this.cargarMedicos();
      });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.medicosService.buscarMedico(termino)
      .subscribe( medicos => {
        this.medicos = medicos;
      });
  }

  actualizarImagen(medico: Medico) {
    this.modalUploadService.mostrarModal('medicos', medico._id);
  }


}
