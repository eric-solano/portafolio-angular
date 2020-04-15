import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProducto();
  }

  private cargarProducto(){
    
    return new Promise((resolve,reject) => {

      this.http.get('https://angular-html-22c21.firebaseio.com/productos_idx.json').
        subscribe((resp: Producto[]) =>{
          console.log(resp);
          this.productos = resp;        
          //setTimeout(()=>{
            this.cargando = false;
          //},2000);
          resolve();
        });
    });
  }

  getProducto(id:string){
    //`: permite hacer insersiones dentro de string
    return this.http.get(`https://angular-html-22c21.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino:string){
    if(this.productos.length === 0){
      //cargar productos
      this.cargarProducto().then(()=>{
        //ejecutar despues de tener los productos
        //aplicar filtros
        this.filtrarProductos(termino);
      });
    }else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string){
    console.log(this.productos);
    this.productoFiltrado = [];
    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod=>{
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if(prod.categoria.indexOf(termino)>=0 || tituloLower.indexOf(termino)>=0)
      {
        this.productoFiltrado.push(prod);
      }
    });

    

  }  

}
