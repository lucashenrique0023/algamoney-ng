import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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
    private toasty: ToastyService
  ) { }

  ngOnInit() {
    const pessoa = new Pessoa();
    console.log(pessoa);
  }

  salvar(form: FormControl){
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.toasty.success('Pessoa salva com sucesso.');
        form.reset();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
