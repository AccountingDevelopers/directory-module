import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgAccountingModule } from 'ng-accounting';
import { NomenclatureModule } from './modules/nomenclature/nomenclature.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WarehousesModule } from './modules/warehouses/warehouses.module';
import { CounterpartiesModule } from './modules/counterparties/counterparties.module';
import { CurrenciesModule } from './modules/currencies/currencies.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NomenclatureModule,
    BrowserAnimationsModule,
    WarehousesModule,
    CurrenciesModule,
    CounterpartiesModule,
    NgAccountingModule.forRoot({
      api: {
        key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGFlZGY2YmRmMWRhOTkwZWI0MmI1YjQiLCJjb21wYW55SWQiOiI2NGQ3OWZlMWVjYzEyOGZmOTZkM2FjYTAiLCJ3b3Jrc3BhY2VOYW1lIjoiam91cm5leSIsImlhdCI6MTY5MTg1NjM0OSwiZXhwIjoxNzE3Nzc2MzQ5fQ.DuFnyueBeB2PB8r61TN8N2KYDwJCbGl6Z4xbqHq5J9g',
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
