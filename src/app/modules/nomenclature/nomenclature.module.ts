import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NomenclatureComponent } from './nomenclature.component';
import { ModuleHeaderModule } from 'ng-accounting';
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TreeSelectModule } from 'primeng/treeselect';
import { AccTableModule } from 'ng-accounting'

@NgModule({
  declarations: [
    NomenclatureComponent
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
    AccTableModule
  ],
  exports: [
    NomenclatureComponent
  ]
})
export class NomenclatureModule { }
