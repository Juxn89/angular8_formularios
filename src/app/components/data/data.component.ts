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
        'apellido' : new FormControl('', [Validators.required, this.NoApellido])
      }),
      'correo' : new FormControl('', [Validators.required, Validators.email]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ]),
      'password1': new FormControl('', [Validators.required]),
      'password2': new FormControl()
    });

    this.forma.controls['password2'].setValidators([
      Validators.required,
      // SE EMPLEA EL .bind(this.forma) PORQUE LA FUNCIÓN SE EJECUTA BAJO OTRO
      // CONTEXTO / SCOOPE. EL .bind LE ASIGNA BAJO QUE COTEXTO SE DEBE DE EJECUTAR
      this.noIgual.bind(this.forma)
    ]);
    // this.forma.setValue(this.usuario);
  }

  ngOnInit() {
  }

  guardarCambios() {
    console.log(this.forma.value, this.forma);
    // OPCIÓN 1 DE LIMPIEZA DEL FORMULARIO
    this.forma.reset(this.usuario);

    // OPCIÓN 2 DE LIMPIEZA DEL FORMULARIO
    /*this.forma.reset({
      nombrecompleto: {
        nombre: '',
        apellido: ''
      },
      correo: ''
    });*/

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

  NoApellido(control: FormControl): {[s: string]: boolean} {
    if (control.value === 'Gomez') {
      return {
        nogomez: true
      };
    }
    return null;
  }

  noIgual(control: FormControl): {[s: string]: boolean} {
    // AL USAR EL .bind(this.forma) NO ES NECESARIO ESCRIBIR this.forma.uk-form-controls
    // PORQUE LA REFERENCIA DE this SEÍA LA forma

    let forma: any = this;
    if (control.value !== forma.controls['password1'].value) {
      return { noiguales: true };
    }
    return null;
  }
}
