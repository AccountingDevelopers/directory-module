import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialMenuComponent } from 'ng-accounting';
import { NomenclatureComponent } from './modules/nomenclature/nomenclature.component';
import { WarehousesComponent } from './modules/warehouses/warehouses.component';
import { CounterpartiesComponent } from './modules/counterparties/counterparties.component';

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
            },
            {
              label: 'Класифікатор одиниць виміру',
              link: 'user-departments'
            },
            {
              label: 'Склади',
              link: 'user-departments'
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
              label: 'Договори',
              link: 'user-departments'
            },
            {
              label: 'Валюти',
              link: 'user-departments'
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
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
