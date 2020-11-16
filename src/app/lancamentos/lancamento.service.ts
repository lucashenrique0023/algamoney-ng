import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';


import "rxjs/add/operator/toPromise";
import * as moment from 'moment';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoDe: Date;
  dataVencimentoAte: Date;
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

      if (filtro.dataVencimentoDe){
        params.set('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'))
      }

      if (filtro.dataVencimentoAte){
        params.set('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'))
      }

      return this.http.get(this.url + '?resumo', { headers, search: params })
      .toPromise()
      .then(response => response.json().content);
    }
}
