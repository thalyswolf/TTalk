import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, LatLng, CameraPosition, GoogleMapsEvent, MarkerOptions, Marker } from '@ionic-native/google-maps';
/**
 * Generated class for the Localizacao page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-localizacao',
  templateUrl: 'localizacao.html',
})
export class Localizacao {

  constructor(public navCtrl: NavController, public navParams: NavParams, public googleMaps:GoogleMaps) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Localizacao');
  }
  ngAfterViewInit(){
    this.loadMap();

  }
  loadMap(){
    let element = document.getElementById('map');
    let map:GoogleMap = this.googleMaps.create(element, {})
    let latlng = new LatLng(-26.8455944,-49.2641228);
    let ltlg = new LatLng(-26.8371128,-49.2726951);

    map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      let position: CameraPosition = {
        target:latlng,
        zoom:10,
        tilt: 30,
      }
      let markOption:MarkerOptions = {
        position:latlng,
        title:''
      }
      let marker = map.addMarker(markOption).then((marker:Marker)=>{
        marker.showInfoWindow();
      })
      map.moveCamera(position);
    })

  }

}
