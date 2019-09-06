import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma: FormGroup;

  usuario: Object = {
    nombrecompleto: {
      nombre: 'Juan',
      apellido: 'Gómez'
    },
    correo: 'mi_correo@gmail.com'
  }

  constructor() {
    console.log(this.usuario);

    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre' : new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido' : new FormControl('', Validators.required)
      }),
      'correo' : new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {
  }

  guardarCambios() {
    console.log(this.forma.value, this.forma);
  }
}
