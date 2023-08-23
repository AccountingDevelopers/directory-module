import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgAccountingModule } from 'ng-accounting';
import { NomenclatureModule } from './modules/nomenclature/nomenclature.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from './modules/counterparties/basic/card/card.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NomenclatureModule,
    BrowserAnimationsModule,
    CardModule,
    NgAccountingModule.forRoot({
      api: {
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRmZWRmMzVlYWNiNGI1MjdjMzU3NTciLCJjb21wYW55SWQiOiI2NGRmZjBkZTM5MDliODZiYzliZDViNzMiLCJ3b3Jrc3BhY2VOYW1lIjoiam91cm5leSIsImlhdCI6MTY5MjUyNjAzMSwiZXhwIjoxNzE4NDQ2MDMxfQ.gM66vgUITeSWQ4K29G17uNqUcQqXhTafyCUoKMtuCWE',
        url: {
          client: 'http://localhost:4200',
          server: isDevMode() ? 'http://localhost:80/api/v1' : 'http://localhost:80/api/v1'
        }
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
