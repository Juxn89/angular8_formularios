import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
      input.ng-invalid.ng-touched {
        border: solid red 1px;
      }
      .ng-invalid.ng-touched:not(form) {
        border: solid red 1px;
      }
  `]
})
export class TemplateComponent implements OnInit {

  usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: "",
    sexo: 'Hombre',
    acepta: false
  };

  paises = [
    {
      codigo: 'NI',
      pais: 'Nicaragua'
    },
    {
      codigo: 'ARG',
      pais: 'Argentina'
    },
  ];

  sexos: string[] = ["Hombre", "Mujer"];

  constructor() { }

  ngOnInit() {
  }

  guardar(formulario: NgForm) {
    console.log('Formulario enviado...');
    console.log('NgForm', formulario);
    console.log('valor', formulario.value);
    console.log('Usuario', this.usuario);
  }
}
