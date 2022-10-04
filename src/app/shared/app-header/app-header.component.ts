import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Placeholders } from 'src/app/enum/placeholders';
import { StorageService } from 'src/app/Services/storage.service';
import { ToastService } from 'src/app/Services/toast.service';
import { TranslatetextService } from 'src/app/Services/translatetext.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent implements OnInit {

  @Input() title = '';
  constructor(
    private storageService: StorageService,
    private navController: NavController,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    public toastService: ToastService,
    private translateTextService: TranslatetextService,
  ) { }

  ngOnInit() {}
  
  async onBackArrow() {
    const url = await this.storageService.get(Placeholders.PREVIOUS_URL);
    if (url) {
      this.navController.navigateBack(url);
    }
  }
}
