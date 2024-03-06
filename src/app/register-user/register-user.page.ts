import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {
  registrationForm: FormGroup = new FormGroup({});
  endpoint = 'https://masteros.cloud/registro_usuario'
  endpoint2 = 'http://localhost:3000/registro_usuario'

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      img: ['', Validators.required],
      id_usuario: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;

       // Realiza la solicitud HTTP con Axios
       axios.post(this.endpoint, formData)
       .then(response => {
         console.log(response.data);
       })
       .catch(error => {
         console.error('Error al registrar el usuario:', error.response.data.message);
       });

      alert("Usuario Registrado")
    }
  }

}
