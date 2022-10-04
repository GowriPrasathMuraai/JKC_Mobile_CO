import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHeaderComponent } from '../shared/app-header/app-header.component';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [{
      path: 'header',
      component: AppHeaderComponent,
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
