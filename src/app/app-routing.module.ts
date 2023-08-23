import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitialMenuComponent } from 'ng-accounting';

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
            }
          ]
        },
        {
          label: 'Купівлі та продажі',
          links: [
            {
              label: 'Контрагенти',
              link: 'counterparties'
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
    path: 'counterparties',
    loadChildren: () =>
      import('./modules/counterparties/counterparties.module').then((m) => m.CounterpartiesModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
