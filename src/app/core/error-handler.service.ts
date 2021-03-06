import { Injectable } from '@angular/core';

import { ToastyService } from 'ng2-toasty';

@Injectable()
export class ErrorHandlerService {

  constructor(private toasty: ToastyService) { }


  handle(errorResponse: any) {
    let msg: string;
    console.log(errorResponse)
    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else if (errorResponse.status.toString().charAt(0) === '4' && errorResponse.json()[0]
      && errorResponse.json()[0].hasOwnProperty('mensagemUsuario')) {

      msg = errorResponse.json()[0].mensagemUsuario;
    } else {
      msg = 'Erro ao processar servico remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }
    this.toasty.error(msg);
  }
}
