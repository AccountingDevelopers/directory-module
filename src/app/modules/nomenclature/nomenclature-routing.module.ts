import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NomenclatureComponent } from './nomenclature.component'
import { BasicComponent } from './basic/basic.component'
import { TypesComponent } from './types/types.component'
import { PriceTypesComponent } from './price-types/price-types.component'

const routes: Routes = [
    { 
        path: '', 
        component: NomenclatureComponent,
        children: [
            {
                path: 'basic',
                component: BasicComponent
            },
            {
                path: 'types',
                component: TypesComponent
            },
            {
                path: 'priceTypes',
                component: PriceTypesComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NomenclatureRoutingModule { }
