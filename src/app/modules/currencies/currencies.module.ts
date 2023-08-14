import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrenciesComponent } from './currencies.component';
import { ModuleHeaderModule, ResponsiblesPipeModule, AccTableModule } from 'ng-accounting';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeSelectModule } from 'primeng/treeselect';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CurrenciesComponent
  ],
  imports: [
    CommonModule,
    ModuleHeaderModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    TreeSelectModule,
    DropdownModule,
    MultiSelectModule,
    ResponsiblesPipeModule,
    FormsModule,
    TableModule,
    AccTableModule
  ]
})
export class CurrenciesModule { }
