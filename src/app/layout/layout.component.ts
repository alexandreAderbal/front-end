import { Component,ViewEncapsulation,AfterViewInit, OnInit} from '@angular/core';
import { Helpers } from '../helpers';

import { LocalStorageService } from '../service/local-storage/local-storage.service';
import { RequestService } from '../service/request/request.service';
import { AlertService } from '../core/alert/alert.service';
import { Usuario } from '../model/usuario';

@Component({
  selector: '.page-wrapper',
  templateUrl:'./layout.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements AfterViewInit,OnInit {

  usuario:Usuario = new Usuario();

  constructor(private requestService:RequestService,
    private alertService:AlertService,
    private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.getUsuario();
  }

  ngAfterViewInit() { Helpers.initLayout(); }

  private getUsuario(){

    this.requestService.getParams("/usuario/find/by",
                                  this.localStorageService.getIdUsuario())
    .subscribe(
      response => {

        this.usuario = response as Usuario;
        this.localStorageService.setNomeUsuario(this.usuario.nome);

        if(this.usuario.layout != null){
          this.localStorageService.setIdLayuot(this.usuario.layout.id.toString());
          Helpers.montaTema(this.usuario.layout);
        }

    },responseError => {
      this.alertService.errors(responseError.error.errors);
    });

  }

}
