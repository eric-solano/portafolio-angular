import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor(private http: HttpClient) { 
    //console.log("Servicio de infoPagina listo!!!");  
    
    //Ler el archivo JSON
    //private http: HttpClient -> con este servicio podemos realizar peticiones a servidores rest, externos y cualquier lado
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json').
    subscribe(
      (resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
        //console.log(resp);
        //console.log(resp["email"]);
      });
  }

  private cargarEquipo(){
    this.http.get('https://angular-html-22c21.firebaseio.com/equipo.json').
    subscribe(
      (resp: any) => {
        this.equipo = resp;
        //console.log(resp);
        //console.log(resp[2]);
      });
  }

}
