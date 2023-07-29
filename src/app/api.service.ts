// api.service.ts

import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://masteros.cloud';

  async getOrdenes() {
    const url = `${this.baseUrl}/ordenes`;
    const response = await axios.get<any[]>(url);
    return response.data;
  }

  async getOrdenById(id: number) {
    const url = `${this.baseUrl}/ordenes/${id}`;
    const response = await axios.get<any>(url);
    return response.data;
  }

  async getAfiliados() {
    const url = `${this.baseUrl}/afiliados`;
    const response = await axios.get<any[]>(url);
    return response.data;
  }

  async getAfiliadoById(id: number) {
    const url = `${this.baseUrl}/afiliados/${id}`;
    const response = await axios.get<any>(url);
    return response.data;
  }

  async getUsuarios() {
    const url = `${this.baseUrl}/usuarios`;
    const response = await axios.get<any[]>(url);
    return response.data;
  }
}