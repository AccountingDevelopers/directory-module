import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterpartiesComponent } from './counterparties.component';
import { BasicComponent } from './basic/basic.component';

const routes: Routes = [
  {
    path: '',
    component: CounterpartiesComponent,
    children: [
      {
        path: 'basic',
        component: BasicComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterpartiesRoutingModule { }
