import { Component, OnInit } from '@angular/core';
import {HospitalService, MedicoService} from '../../services/service.index';
import {Medico} from '../../models/medico.model';
import {Hospital} from '../../models/hospital.model';
import {NgForm} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');
  hospitales: Hospital[] = [];

  constructor(public medicosService: MedicoService,
              public hospitalService: HospitalService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public modalUploadService: ModalUploadService) {
    activatedRoute.params.subscribe( params => {
      const id = params['id'];
      if (id !== 'nuevo'){
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => this.hospitales = hospitales);
    this.modalUploadService.notificacion.subscribe((resp) => {
      console.log(resp);
      // para que actualice la imagen inmediatamente en la pantalla despues de cargarla
      this.medico.img = resp.medico.img;
    });

  }

  guardarMedico(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.medico._id) {
      this.medicosService.actualizarMedico(this.medico)
        .subscribe(medico => {
          console.log(medico);
          this.medico._id = medico._id;
          this.router.navigate(['/medico', medico._id]);
        });
    } else {
      this.medicosService.guardarMedico(this.medico)
        .subscribe(medico => {
          console.log(medico);
          this.medico._id = medico._id;
          this.router.navigate(['/medico', medico._id]);
        });
    }

  }

  cambioHospital( id: string) {
    this.hospitalService.obtenerHospital(id)
      .subscribe( hospital => {
        this.hospital = hospital;
      });
  }

  cargarMedico(id: string) {
    this.medicosService.cargarMedico(id).subscribe( (medico) => {
      this.medico = medico;
      console.log(medico);
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital)
    });
  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
