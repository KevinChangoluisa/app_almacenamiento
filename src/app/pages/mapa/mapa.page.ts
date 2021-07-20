import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var mapboxgl: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})

export class MapaPage implements OnInit, AfterViewInit {

  latitud: number;
  longitud: number;
  nombre: string;
  img: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    let geo: any = this.route.snapshot.paramMap.get('geo');
    geo = JSON.parse(geo)
    this.nombre = geo.name;
    this.latitud = Number(geo.lat);
    this.longitud = Number(geo.lng);


  }
  ngAfterViewInit() {

    mapboxgl.accessToken =
      'pk.eyJ1Ijoia2NoYW5nb2x1aXNhIiwiYSI6ImNrcWxqdmV3cTBhYWsydW1tbGRsenh6NHUifQ.SqTYpW1JNssBmExGf9ieuA';
    const map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [this.longitud, this.latitud], // starting position [lng, lat]
      zoom: 12 // starting zoom
    });

    map.on('load', () => {
      map.resize();


      new mapboxgl.Marker()
        .setLngLat([this.longitud, this.latitud])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`
              <h4>Casa de ${this.nombre}</h4>
              <img src="${this.img}" width="50%" height="50%"/>
              `))
        .addTo(map);


      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      let labelLayerId;
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.
      map.addLayer(
        {
          'id': 'add-3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // Use an 'interpolate' expression to
            // add a smooth transition effect to
            // the buildings as the user zooms in.
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },

        labelLayerId
      );
    });
  }

}
