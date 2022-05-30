import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import {AngularMaterialModule} from "../../core/angular-material.module";
import {RouterModule} from "@angular/router";

const components: Array<any> = [
  MenuComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule
  ],
  exports: [
    ...components
  ]
})
export class LayoutModule { }
