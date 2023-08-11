import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NomenclatureComponent } from './nomenclature.component';
import { ModuleHeaderModule } from 'ng-accounting';
import { ButtonModule } from 'primeng/button'
import { TreeTableModule } from 'primeng/treetable';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TreeSelectModule } from 'primeng/treeselect';

@NgModule({
  declarations: [
    NomenclatureComponent
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
    TreeSelectModule
  ],
  exports: [
    NomenclatureComponent
  ]
})
export class NomenclatureModule { }
