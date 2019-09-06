import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
    // pasatiempos: ['Correr', 'Dormir', 'Comer']
  };

  constructor() {
    console.log(this.usuario);

    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        'nombre' : new FormControl('', [Validators.required, Validators.minLength(3)]),
        'apellido' : new FormControl('', Validators.required)
      }),
      'correo' : new FormControl('', [Validators.required, Validators.email]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ])
    });

    // this.forma.setValue(this.usuario);
  }

  ngOnInit() {
  }

  guardarCambios() {
    console.log(this.forma.value, this.forma);
    // OPCIÓN 1 DE LIMPIEZA DEL FORMULARIO
    this.forma.reset(this.usuario);

    // OPCIÓN 2 DE LIMPIEZA DEL FORMULARIO
    this.forma.reset({
      nombrecompleto: {
        nombre: '',
        apellido: ''
      },
      correo: ''
    });

    // OPCIÓN 3 DE LIMPIEZA DEL FORMULARIO
    this.forma.controls['correo'].setValue('nuevocorreo@gmail.com');
  }

  agregarPasatiempo() {
    // DE ESTA MANERA DE INDICAMOS A TypeScript QUE EL OBJETO DEBE DE SER TRATADO
    // COMO UN ARRAY
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('', Validators.required)
    );
  }
}
