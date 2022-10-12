import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Placeholders } from 'src/app/enum/placeholders';
import { StorageService } from 'src/app/Services/storage.service';
import { ToastService } from 'src/app/Services/toast.service';

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
    public toastService: ToastService,
  ) { }

  ngOnInit() {}
  
  async onBackArrow() {
    const url = await this.storageService.get(Placeholders.PREVIOUS_URL);
    console.log(url);
    if (url) {
      this.navController.navigateBack(url);
    }
  }
}
