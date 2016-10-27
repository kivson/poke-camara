import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {CongressistaService} from "./services/congressista.service";
import { CartaComponent } from './carta/carta.component';
import { CardListComponent } from './card-list/card-list.component';
import {Ng2PaginationModule} from 'ng2-pagination';

@NgModule({
  declarations: [
    AppComponent,
    CartaComponent,
    CardListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2PaginationModule
  ],
  providers: [CongressistaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
