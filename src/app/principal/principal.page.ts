import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuarios: Observable<any>;
  id: any;
  ubicacion = {};



  constructor(
    private dataService: DataService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.usuarios = this.dataService.getUsers();
  }

  abrir(user) {
    this.presentAlert(user);
    this.ubicacion =
    {
      name: user.name,
      lat: user.address.geo.lat,
      //photo:user.photo,
      lng: user.address.geo.lng
    }
      ;
    console.log(JSON.stringify(this.ubicacion))
  }


  async presentAlert(user) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: `
      <ion-card-header >
      <ion-card-title>${user.username}</ion-card-title>
      <img src="${user.photo}" alt="g-maps" style="border-radius: 2px">
      </ion-card-header>
      <ion-card-content>
      <b>Nombre:</b>${user.name} <br>
      <b>Email:</b>${user.email}<br>
      <b>Teléfono:</b>${user.phone}<br>
      <b>Dirección:</b>${user.address.street}<br>

      </ion-card-content>`,
      buttons: [
        {
          text: 'Ubicacion',
          cssClass: 'secondary',
          handler: () => {
            this.navCtrl.navigateForward(`/home/principal/mapa/${JSON.stringify(this.ubicacion)}`)
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}



