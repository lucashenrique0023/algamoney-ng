import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [
    { nome: "Manoel Pinheiro", cidade: "Uberlandia", estado: "MG", status: true },
    { nome: "Sebastiao da Silva", cidade: "Sao Paulo", estado: "SP", status: false },
    { nome: "Carla Souza", cidade: "Florianopolis", estado: "SC", status: true },
    { nome: "Luis Pereira", cidade: "Curitiba", estado: "PR", status: true },
    { nome: "Vilmar Andrade", cidade: "Rio de Janeiro", estado: "RJ", status: false },
    { nome: "Paula Maria", cidade: "Uberlandia", estado: "MG", status: true }
  ]

  constructor() { }

  ngOnInit() {
  }

}
