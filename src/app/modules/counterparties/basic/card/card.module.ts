import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { AccCardModule, ModuleHeaderModule } from 'ng-accounting';
import { TabMenuModule } from 'primeng/tabmenu';
import { RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { CounterpartiesRoutingModule } from './card-routing.module';
import { DynamicDialogRef } from 'primeng/dynamicdialog'

@NgModule({
  declarations: [
    CardComponent,
    BasicComponent
  ],
  imports: [
    CommonModule,
    ModuleHeaderModule,
    TabMenuModule,
    RouterModule,
    AccCardModule,
    CounterpartiesRoutingModule
  ],
  exports: [
    CardComponent,
    BasicComponent
  ],
  providers: [
    DynamicDialogRef
  ]
})
export class CardModule { }
