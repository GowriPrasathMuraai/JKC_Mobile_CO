import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [AppHeaderComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [AppHeaderComponent, MatTableModule,MatIconModule]
})
export class SharedModule { }
