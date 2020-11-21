import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PaginaNaoEncontradaComponent } from './core/pagina-nao-encontrada.component';
import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';

const routes: Routes = [
  { path: '', redirectTo: 'pessoas', pathMatch: 'full'},
  { path: '**', component: PaginaNaoEncontradaComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
