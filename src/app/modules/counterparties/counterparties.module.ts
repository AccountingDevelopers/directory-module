import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterpartiesComponent } from './counterparties.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModuleHeaderModule, ResponsiblesPipeModule } from 'ng-accounting';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { FieldsetModule } from 'primeng/fieldset';
import { ChipsModule } from 'primeng/chips';

@NgModule({
  declarations: [
    CounterpartiesComponent
  ],
  imports: [
    CommonModule,
    ModuleHeaderModule,
    ButtonModule,
    TreeTableModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    TreeSelectModule,
    DropdownModule,
    MultiSelectModule,
    ResponsiblesPipeModule,
    FormsModule,
    FieldsetModule,
    ChipsModule
  ],
  exports: [
    CounterpartiesComponent
  ]
})
export class CounterpartiesModule { }
