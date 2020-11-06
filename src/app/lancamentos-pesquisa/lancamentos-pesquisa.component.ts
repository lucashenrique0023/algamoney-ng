import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    { tipo: 'DESPESA', descricao: 'Compra de pao', dataVencimento: '30/06/2017',
    dataPagamento: null, valor: 4.55, pessoa: 'Padaria do Jose'},
    { tipo: 'RECEITA', descricao: 'Venda de Software', dataVencimento: '10/06/2017',
     dataPagamento: '09/06/2017', valor: 80000,pessoa: 'Atacado Brasil'},
    { tipo: 'DESPESA', descricao: 'Impostos', dataVencimento: '20/07/2017',
    dataPagamento: null, valor: 14312,pessoa: 'Ministerio da Fazenda'},
    { tipo: 'RECEITA', descricao: 'Venda de carro', dataVencimento: '18/08/2017',
    dataPagamento: null, valor: 55000,pessoa: 'Sebastiao Souza'},
    { tipo: 'DESPESA', descricao: 'Mensalidade de escola', dataVencimento: '05/06/2020',
    dataPagamento: '30/05/2017', valor: 800, pessoa: 'Escola Abelha Rainha'},
    { tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: '10/07/2017',
    dataPagamento: '09/07/2017', valor: 1750,pessoa: 'Casa Nova Imoveis'},
    { tipo: 'DESPESA', descricao: 'Mensalidade musculacao', dataVencimento: '13/07/2017',
    dataPagamento: null, valor: 180,pessoa: 'Academia Top'}
  ];

}
