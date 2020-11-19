import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class CategoriaService {

  url = "http://localhost:8080/categorias";

  constructor(private http: Http) { }


  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.url}`)
    .toPromise()
    .then( categorias => categorias.json());
  }
}
