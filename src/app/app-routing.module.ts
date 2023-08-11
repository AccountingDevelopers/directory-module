import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialMenuComponent } from 'ng-accounting';
import { NomenclatureComponent } from './modules/nomenclature/nomenclature.component';

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
              link: 'user-departments'
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
              link: 'users'
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
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
