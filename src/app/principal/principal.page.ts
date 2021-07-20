import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  usuarios: Observable<any>;
  id: any;



  constructor(private dataService: DataService, private alertController: AlertController) { }

  ngOnInit() {
    this.usuarios = this.dataService.getUsers();
  }

  abrir(user) {
    this.presentAlert(user);
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
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
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



