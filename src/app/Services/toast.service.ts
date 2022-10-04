import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  async warning(
    message: string,
    duration: number,
    css: string,
    customIcon?: string,
    actionText?: string
  ): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top',
      cssClass: css,
      mode: 'md',
      buttons: [
        {
          side: 'start',
          icon: customIcon,
        },
        {
          text: actionText,
          role: 'cancel',
        },
      ],
    });
    toast.present();
  }

  async success(
    message: string,
    duration: number,
    cssClass: string,
    position: 'top' | 'bottom' | 'middle'
  ): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      cssClass: cssClass,
      position: position,
    });
    toast.present();
  }
}
