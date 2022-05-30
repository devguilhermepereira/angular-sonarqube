import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './core/angular-material.module';
import { CommonModule } from '@angular/common';
import {PagesModule} from "./pages/pages.module";
import {LayoutModule} from "./shared/layout/layout.module";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    AppRouting,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PagesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
