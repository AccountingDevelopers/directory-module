import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NomenclatureComponent } from './nomenclature.component'
import { BasicComponent } from './basic/basic.component'
import { TypesComponent } from './types/types.component'

const routes: Routes = [
    { 
        path: 'api/v1/modules/nomenclature', 
        component: NomenclatureComponent,
        children: [
            {
                path: 'basic',
                component: BasicComponent
            },
            {
                path: 'types',
                component: TypesComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NomenclatureRoutingModule { }
