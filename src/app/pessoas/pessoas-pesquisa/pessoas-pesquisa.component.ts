import { Component, OnInit, ViewChild } from '@angular/core';

import { ToastyService } from 'ng2-toasty';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { PessoaService, PessoaFiltro } from './../pessoa.service';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  filtro = new PessoaFiltro();
  totalRegistros = 0;
  pessoas = [];
  @ViewChild('tabela') grid;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private confirmation: ConfirmationService,
    private title: Title
    ) { }

  ngOnInit() {
    this.title.setTitle('Pesquisar Pessoas');
  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
    .then(resultado => {
      this.pessoas = resultado.pessoas,
      this.totalRegistros = resultado.total
    })
  }

  aoMudarPagina(event: LazyLoadEvent){
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  mudarStatus(pessoa: any) {
    this.pessoaService.mudarStatus(pessoa.codigo, !pessoa.ativo)
      .then( () => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        const msg = !pessoa.ativo ? 'ativada' : 'desativada';
        this.toasty.success(`Pessoa ${msg} com sucesso.`)
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmacaoExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
      .then(() =>
      {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
        this.toasty.success('Pessoa excluida com sucesso.')
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
}
