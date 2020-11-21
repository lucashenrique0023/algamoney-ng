import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ]

  categorias = [];
  lancamento = new Lancamento();
  pessoas = [];

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];
    this.title.setTitle('Novo Lancamento');
    if (codigoLancamento) {
      this.buscarLancamentoPorCodigo(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo)
  }

  buscarLancamentoPorCodigo(codigo: number){
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    this.categoriaService.listarTodas()
      .then( categorias => {
        this.categorias = categorias.map(categoria => ({label: categoria.nome, value: categoria.codigo}));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(pessoa => ({label: pessoa.nome, value: pessoa.codigo}) )
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl){
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.cadastrar(this.lancamento)
      .then((lancamentoAdicionado) => {
        this.toasty.success('Lancamento cadastrado com sucesso.');
        //form.reset();
        //this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .then((lancamento) => {
        this.lancamento = lancamento;
        this.atualizarTituloEdicao();
        this.toasty.success('Lancamento atualizado com sucesso.');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();

    setTimeout(function(){
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle('Editar Lancamento: ' + this.lancamento.descricao );
  }

}
