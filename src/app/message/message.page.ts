import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import axios from 'axios';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  msgForm: FormGroup;
  api: any [] = [];
  apikey: any;
  user: any;
  password: any;

  constructor(private formBuilder: FormBuilder) {
    this.msgForm = this.formBuilder.group({
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.msgForm = this.formBuilder.group({
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
    this.getApikey();
  }

  getApikey() {
    const url = 'https://masteros.cloud/apikey';
    const id = 1; // ID deseado
  
    axios.get(url)
      .then(response => {
        this.apikey = response.data;
  
        // Buscar el conjunto de datos por ID
        const apiSeleccionada = this.api.find(api => api.id === id);
  
        if (apiSeleccionada) {
          // Los datos del afiliado seleccionado están en la variable `afiliadoSeleccionado`
          console.log(apiSeleccionada);

          this.user = apiSeleccionada.user;

          this.password = apiSeleccionada.password;
          
        } else {
          console.log(`No se encontró ningún afiliado con ID ${id}`);
        }
      })
      .catch(error => {
        console.error('Error al obtener los afiliados:', error);
      });
  }

  async whatsapp() {
    if (this.msgForm.valid) {
      const asunto = this.msgForm.get('asunto')?.value;
      const mensaje = this.msgForm.get('mensaje')?.value;
      console.log(asunto);
      console.log(mensaje);

      // Enviar mensaje utilizando Axios o la biblioteca de tu elección
      try {
        const response = await axios.post(
          'https://api.twilio.com/2010-04-01/Accounts/AC100cb9d640b55673e2b655f9d0229498/Messages.json',
          new URLSearchParams({
            'To': 'whatsapp:+5219811402316',
            'From': 'whatsapp:+14155238886',
            'Body': `${asunto} - ${mensaje}`
          }),
          {
            auth: {
              username: 'AC100cb9d640b55673e2b655f9d0229498',
              password: 'fd3f1d38658b94bd16249601e471ec44'
            }
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Por favor, completa los campos requeridos.');
    }
  }
}
