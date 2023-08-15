import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialMenuComponent } from 'ng-accounting';
import { WarehousesComponent } from './modules/warehouses/warehouses.component';
import { CounterpartiesComponent } from './modules/counterparties/counterparties.component';
import { CurrenciesComponent } from './modules/currencies/currencies.component';
import { UnitsComponent } from './modules/units/units.component';

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
            },
            {
              label: 'Еденицы измерения',
              link: 'units'
            }
          ]
        }
      ]
    }
  },
  {
    path: 'nomenclature',
    loadChildren: () =>
      import('./modules/nomenclature/nomenclature.module').then((m) => m.NomenclatureModule)
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
  },
  {
    path: 'units',
    component: UnitsComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
