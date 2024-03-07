import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
    const id_usuario = uuidv4().slice(0, 6);

    this.registrationForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      img: ['', Validators.required],
      id_usuario: [id_usuario, Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      const idUsuario = this.registrationForm.value.id_usuario;
      const password = this.registrationForm.value.password;
      const telefono = this.registrationForm.value.telefono;

       // Realiza la solicitud HTTP con Axios
       axios.post(this.endpoint, formData)
       .then(response => {
         console.log(response.data);
       })
       .catch(error => {
         console.error('Error al registrar el usuario:', error.response.data.message);
       });

      alert("Usuario Registrado")
      this.sendSMS(idUsuario , password, telefono);
    }
  }

  sendSMS(idUsuario: string, password: string, telefono: string) {
    const data = new URLSearchParams();
    data.append('id_usuario', idUsuario);
    data.append('password', password);
    data.append('telefono', telefono);
    
    return axios.post('https://masteros.cloud/sms', data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

}
