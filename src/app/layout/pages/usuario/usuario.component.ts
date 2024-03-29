import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

import { ModalPermissaoComponent } from './modal-permissao/modal-permissao.component';
import { RequestService } from 'src/app/service/request/request.service';
import { ModalUsuarioComponent } from './modal/modal_usuario.component';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  modalOptions:NgbModalOptions;
  usuarios:Usuario[];
  search:string;

  constructor(private requestService: RequestService,
    private alertService:AlertService,
    private modalService: NgbModal){

      this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }

  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  open(title:string,usuario:Usuario,isDelete:Boolean) {
    const modalRef = this.modalService.open(ModalUsuarioComponent,
      {
        scrollable: false,
        size: isDelete ? 'md' : 'lg'
      });

      modalRef.componentInstance.modal_titulo = title;
      modalRef.componentInstance.usuario = usuario;
      modalRef.componentInstance.isDelete = isDelete;

      modalRef.result.then((result) => {
        this.loadUsuarios();
      }).catch((res) => {});
  }

  alterar(usuario:Usuario){
    this.open('Alterar Usuário',usuario,false);
  }

  cadastrar(){
    this.open('Cadastrar Usuário',new Usuario(),false);
  }

  deletar(usuario:Usuario){
    this.open('Excluir Usuário',usuario,true);
  }

  loadUsuarios(){
    this.requestService.get("/usuario/find/all")
    .subscribe(response => {
      this.usuarios = response as Usuario[];
    },responseError => {
      this.alertService.errors(responseError.error.errors);
    });
  }

  openModalPermissao(usuario:Usuario) {
    const modalRef = this.modalService.open(ModalPermissaoComponent,
      {
        scrollable: true,
        size: 'lg'
      });

      modalRef.componentInstance.usuario = usuario;

      modalRef.result.then((result) => {
        this.loadUsuarios();
      }).catch((res) => {});
  }

}
