import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialMenuComponent } from 'ng-accounting';
import { NomenclatureComponent } from './modules/nomenclature/nomenclature.component';
import { WarehousesComponent } from './modules/warehouses/warehouses.component';
import { CounterpartiesComponent } from './modules/counterparties/counterparties.component';
import { CurrenciesComponent } from './modules/currencies/currencies.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: InitialMenuComponent,
    data: {
      menuList: [
        {
          label: 'Товари і послуги',
          links: [
            {
              label: 'Номенклатура',
              link: 'nomenclature'
            },
            {
              label: 'Склади',
              link: 'warehouses'
            }
          ]
        },
        {
          label: 'Купівлі та продажі',
          links: [
            {
              label: 'Контрагенти',
              link: 'counterparties'
            },
            {
              label: 'Валюти',
              link: 'currencies'
            }
          ]
        }
      ]
    }
  },
  {
    path: 'nomenclature',
    component: NomenclatureComponent
  },
  {
    path: 'warehouses',
    component: WarehousesComponent
  },
  {
    path: 'counterparties',
    component: CounterpartiesComponent
  },
  {
    path: 'currencies',
    component: CurrenciesComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
