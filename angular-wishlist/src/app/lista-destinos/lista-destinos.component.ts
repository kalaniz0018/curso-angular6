import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje.model';
import { DestinosApiClient } from './../models/destinos-api-client.model';


@Component({
  selector: 'app-lista-destino',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinoComponent implements OnInit {
  @Output() onItemAdded:EventEmitter<DestinoViaje>;
  updates: string[];
  //destinos: DestinoViaje[];
  constructor(public destinosApiClient:DestinosApiClient) { 
    this.onItemAdded = new EventEmitter();
    this.updates = [];
    this.destinosApiClient.subscribeOnChange((d: DestinoViaje) => {
      if (d != null){
        this.updates.push('Se ha elegido a ' + d.nombre);
      }
    });
  }

  ngOnInit() {
  }
 
  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(e: DestinoViaje){
    this.destinosApiClient.elegir(e);
  }
}