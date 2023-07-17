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
              password: '8270471c60f3ca15e7157fec48ce8a8c'
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
