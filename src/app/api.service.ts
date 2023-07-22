// api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://masteros.cloud';

  constructor(private http: HttpClient) {}

  async getOrdenes() {
    const url = `${this.baseUrl}/ordenes`;
    return this.http.get<any[]>(url).toPromise();
  }

  async getOrdenById(id: number) {
    const url = `${this.baseUrl}/ordenes/${id}`;
    return this.http.get<any>(url).toPromise();
  }

  async getAfiliados() {
    const url = `${this.baseUrl}/afiliados`;
    return this.http.get<any[]>(url).toPromise();
  }

  async getAfiliadoById(id: number) {
    const url = `${this.baseUrl}/afiliados/${id}`;
    return this.http.get<any>(url).toPromise();
  }
}
