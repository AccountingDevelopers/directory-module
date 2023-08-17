import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NomenclatureComponent } from './nomenclature.component';
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TreeSelectModule } from 'primeng/treeselect';
import { AccTableModule, ModuleHeaderModule, ElementFieldModule } from 'ng-accounting'
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { NomenclatureRoutingModule } from './nomenclature-routing.module';
import { BasicComponent } from './basic/basic.component';
import { TypesComponent } from './types/types.component';

@NgModule({
  declarations: [
    NomenclatureComponent,
    BasicComponent,
    TypesComponent,
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
    AccTableModule,
    TabViewModule,
    TabMenuModule,
    NomenclatureRoutingModule,
    ElementFieldModule
  ],
  exports: [
    NomenclatureComponent,
    BasicComponent,
    TypesComponent
  ]
})
export class NomenclatureModule { }
