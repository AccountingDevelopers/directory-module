import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { CardComponent } from './card.component';

const routes: Routes = [{
  path: '',
  component: CardComponent,
  children: [{
    path: 'basic',
    component: BasicComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CounterpartiesRoutingModule { }
