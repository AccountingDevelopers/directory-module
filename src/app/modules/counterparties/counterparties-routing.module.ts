import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterpartiesComponent } from './counterparties.component';
import { CardComponent } from './basic/card/card.component';
import { ListComponent } from './basic/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: CounterpartiesComponent,
    children: [
      {
        path: 'basic',
        component: ListComponent,
      }
    ]
  },
  {
    path: 'basic/:id',
    loadChildren: () =>
      import('./basic/card/card.module').then((m) => m.CardModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterpartiesRoutingModule { }
