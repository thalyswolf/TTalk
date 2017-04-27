import {Status} from './status';
import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable()
export class User{
    id:string;
    usuario:string;
    nome:string;
    email:string;
    frase:string;
    foto:string;
    status:string;

  public getId(){
    return this.id;
  }

  public setId(id:string){
    this.id = id;
  }

  public getUsuario(){
    return this.usuario;
  }

  public setUsuario(usuario:string){
    this.usuario = usuario;
  }

  public getNome(){
    return this.nome;
  }

  public setNome(nome:string){
    this.nome = nome;
  }

  public getEmail(){
    return this.email;
  }

  public setEmail(email:string){
    this.email = email;
  }

  public getFrase(){
    return this.frase;
  }

  public setFrase(frase:string){
    this.frase = frase;
  }

  public getFoto(){
    return this.foto
  }

  public setFoto(foto:string){
    this.foto = foto;
  }

  public getStatus(){
    return this.status;
  }

  public setStatus(status:string){
    this.status = status;
  }



}
