import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {
  registrationForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      img: ['', Validators.required],
      id_usuario: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      // Aquí puedes realizar la lógica para enviar formData al backend para el registro.
      console.log(formData);
    }
  }

}
