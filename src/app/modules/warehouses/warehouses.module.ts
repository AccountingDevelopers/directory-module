import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehousesComponent } from './warehouses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccTableModule, ModuleHeaderModule, ResponsiblesPipeModule } from 'ng-accounting';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';



@NgModule({
  declarations: [WarehousesComponent],
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
    AccTableModule
  ],
  exports: [WarehousesComponent]
})
export class WarehousesModule { }
