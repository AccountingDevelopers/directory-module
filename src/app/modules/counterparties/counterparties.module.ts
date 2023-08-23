import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CounterpartiesRoutingModule } from './counterparties-routing.module';
import { CounterpartiesComponent } from './counterparties.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModuleHeaderModule, AccTableModule, ElementFieldModule } from 'ng-accounting';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TreeSelectModule } from 'primeng/treeselect';
import { BasicComponent } from './basic/basic.component';
import { ListComponent } from './basic/list/list.component';


@NgModule({
  declarations: [
    CounterpartiesComponent,
    BasicComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CounterpartiesRoutingModule,
    ModuleHeaderModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    TreeSelectModule,
    AccTableModule,
    TabViewModule,
    TabMenuModule,
    ElementFieldModule
  ]
})
export class CounterpartiesModule { }
