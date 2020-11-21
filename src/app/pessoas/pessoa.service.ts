import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { Pessoa } from 'app/core/model';

import "rxjs/add/operator/toPromise";

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable()
export class PessoaService {

  url = "http://localhost:8080/pessoas";

  constructor(private http: Http) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const headers = new Headers();
    const params = new URLSearchParams();

    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome){
      params.set('nome', filtro.nome);
    }

    return this.http.get(this.url, { headers, search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const pessoas = responseJson.content;
      const resultado = {
        pessoas,
        total: responseJson.totalElements
      }

      return resultado;
    });
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=')

    return this.http.delete(`${this.url}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.url}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  listarTodas(): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');

    return this.http.get(`${this.url}?resumo`, {headers})
      .toPromise()
      .then(resultado => resultado.json().content);
  }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.url, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response.json() as Pessoa);
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    return this.http.get(`${this.url}/${codigo}`, { headers })
      .toPromise()
      .then(response => response.json() as Pessoa);
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW46YWRtaW4=');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.url}/${pessoa.codigo}`, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response.json() as Pessoa);
  }
}
