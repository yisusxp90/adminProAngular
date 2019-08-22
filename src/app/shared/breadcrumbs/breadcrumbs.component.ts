import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  constructor( private router: Router, private title: Title, private meta: Meta) {

    this.getDataRoute().subscribe( (data: any) => {
      console.log(data.titulo);
      this.titulo = data.titulo;
      // colocar el titulo a la pagina
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: 'descripcion',
        content: this.titulo
      };
      this.meta.updateTag(metaTag);
    });

  }

  ngOnInit() {
  }

  // obtenemos la data que pusimos en el pages.route.ts
  getDataRoute() {
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    );
  }
}
