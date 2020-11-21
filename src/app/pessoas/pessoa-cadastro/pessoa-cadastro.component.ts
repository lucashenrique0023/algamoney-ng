import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { Pessoa } from './../../core/model';
import { PessoaService } from './../pessoa.service';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private toasty: ToastyService,
    private title: Title,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Nova Pessoa');
    const codigoPessoa = this.route.snapshot.params['codigo'];

    if (codigoPessoa) {
      this.buscarPessoaPorCodigo(codigoPessoa);
    }

  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.toasty.success('Pessoa salva com sucesso.');
        form.reset();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  buscarPessoaPorCodigo(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;
        this.atualizarTituloEdicao();
        this.toasty.success('Pessoa atualizada com sucesso.');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    this.pessoa = new Pessoa();
    this.router.navigate(['/pessoas/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle('Editar Pessoa: ' + this.pessoa.nome);
  }

}
