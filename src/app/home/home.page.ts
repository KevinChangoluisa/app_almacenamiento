import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //obtenido de los datos almacenados
  usuario: string;
  password: string;
  //obtiene los datos del front-end
  usuario_: any;
  psw: any;

  constructor(
    private storage: Storage,
    private alertController: AlertController,
    private navCtrl: NavController,
    public toastController: ToastController) { }

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
    this.registro();
    this.usuario = await this.storage.get('user') || '';
    this.password = await this.storage.get('psw') || '';
  }

  validar() {
    this.usuario_ = document.getElementById("usuario");
    this.psw = document.getElementById("password");
    console.log(this.usuario_.value);
    console.log(this.psw.value);
    console.log(this.usuario);
    console.log(this.psw);

    if (this.usuario === this.usuario_.value && this.password === this.psw.value) {
      this.navCtrl.navigateForward('/home/principal')
    }
    else {
      this.presentAlertConfirm();
    }
  }


  async registro() {
    await this.storage.set('user', this.usuario);
    await this.storage.set('psw', this.password);
  }

  async registro_nuevo(user_new, psw_new) {
    await this.storage.set('user', 'user_new');
    await this.storage.set('psw', 'psw_new');
  }
  //confirmacion
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'INFORMACIÓN',
      message: 'Usuario no registrado, Desa registrar sus datos? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.presentAlertPrompt();
          }
        }
      ]
    });

    await alert.present();
  }

  //registro
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Registro de usuario ',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Ingrese su usuario '
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Ingrese su calve',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 10,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.usuario = data.nombre;
            this.password = data.password;
            this.registro();
            this.presentToast('usuario registrado')
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }


}

