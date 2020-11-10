import {Injectable, Inject, forwardRef} from '@angular/core';
import { DestinoViaje } from './destino-viaje.model';
import { Store } from '@ngrx/store';
import {
    NuevoDestinoAction,
    ElegidoFavoritoAction
  } from './destinos-viajes-state.model';
import {AppConfig, AppState, APP_CONFIG} from './../app.module';
import { HttpClient, HttpClientModule, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class DestinosApiClient {
  destinos: DestinoViaje[] = [];

  constructor(
    private store: Store<AppState>,
    @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
    private http: HttpClient
  ) {
    this.store
      .select(state => state.destinos)
      .subscribe((data) => {
        console.log('destinos sub store');
        console.log(data);
        this.destinos = data.items;
      });
    this.store
      .subscribe((data) => {
        console.log('all store');
        console.log(data);
      });
  }

  add(d: DestinoViaje) {
    const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
    const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers: headers });
    this.http.request(req).subscribe((data: HttpResponse<{}>) => {
      if (data.status === 200) {
        this.store.dispatch(new NuevoDestinoAction(d));
	  }
    });
  }

  getById(id: String): DestinoViaje {
    return this.destinos.filter(function(d) { return d.id.toString() === id; })[0];
  }

  getAll(): DestinoViaje[] {
    return this.destinos;
  }

  elegir(d: DestinoViaje) {
    // aqui incovariamos al servidor
    this.store.dispatch(new ElegidoFavoritoAction(d));
  }
}
