import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppNavRouters } from '../helpers/router-path';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  isApproverSelected = false;
  isAccountSelected = false;
  isSettingSelected = false;

  constructor(private navController: NavController) {}
  ngOnInit(): void {
    
  }
  onTabChange(event: { tab: string }) {
    if (event.tab === 'approver') {
      this.isApproverSelected = true;
      this.isSettingSelected = false;
      this.isAccountSelected = false;
      this.navController.navigateRoot('/menu/tabs/approver');
    } else if (event.tab === 'account') {
      this.isAccountSelected = true;
      this.isSettingSelected = false;
      this.isApproverSelected = false;
      this.navController.navigateRoot(AppNavRouters.ACCOUNT_TAB);
    } else if (event.tab === 'settings') {
      this.isApproverSelected = false;
      this.isSettingSelected = true;
      this.isAccountSelected = false;
      this.navController.navigateRoot('/menu/tabs/settings');
    }
  }
}
