import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {CongressistaService} from "./services/congressista.service";
import { CartaComponent } from './carta/carta.component';

@NgModule({
  declarations: [
    AppComponent,
    CartaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CongressistaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
