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
      header: user.name,
      subHeader: user.username,
      message: `<b>Dirección:</b>${user.address.street},${user.address.city}<br/><b>WEBSITE:</b>${user.website}`,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}



