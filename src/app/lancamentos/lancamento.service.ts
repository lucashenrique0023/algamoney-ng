import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import "rxjs/add/operator/toPromise";

export interface LancamentoFiltro {
  descricao: string;
}

@Injectable()
export class LancamentoService {

  url = "http://localhost:8080/lancamentos"

  constructor(
    private http: Http
    ) { }


    pesquisar(filtro: LancamentoFiltro): Promise<any> {
      const headers = new Headers();
      const params = new URLSearchParams();
      headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

      if (filtro.descricao){
        params.set('descricao', filtro.descricao);
      }

      return this.http.get(this.url + '?resumo', { headers, search: params })
      .toPromise()
      .then(response => response.json().content);
    }
}
