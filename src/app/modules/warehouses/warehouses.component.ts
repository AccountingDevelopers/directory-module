import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccSystemService, AccCompaniesService, convertArrayToTree } from 'ng-accounting';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent {
  constructor(private readonly accSystemService: AccSystemService, private readonly accCompaniesService: AccCompaniesService) { }

  dialogStage: any = {
    isCreateWarehouse: false,
    isCreateWarehousesGroup: false
  }

  currentCompany!: any
  subscription: Subscription = new Subscription()
  editTimeout!: any
  warehousesDataTable: any[] = []
  warehouses: any[] = []
  warehouseGroups: any[] = []
  responsibles: any[] = []

  warehouseTypes: any[] = [
    {
      label: 'Оптовый склад',
      value: 'warehouse'
    },
    {
      label: 'Розничный магазин',
      value: 'retailStore'
    },
    {
      label: 'Неавтоматизированная торговая точка',
      value: 'nonAutomatedOutlet'
    }
  ]

  createWarehouseForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    code: new FormControl(null),
    parentId: new FormControl(null),
    type: new FormControl(null),
    description: new FormControl(null),
    responsibles: new FormControl(null),
    children: new FormControl([])
  })

  createWarehouseGroupForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    parentId: new FormControl(null),
    isGroup: new FormControl(true),
    children: new FormControl([])
  })

  ngOnInit(): void {
    this.init()
    this.responsibles = this.accSystemService.users
  }

  init() {
    this.currentCompany = this.accSystemService.currentCompany
    this.warehousesDataTable = convertArrayToTree(this.currentCompany.datasets.warehouses, { isWrapedInData: true })
    this.warehouseGroups = convertArrayToTree(this.currentCompany.datasets.warehouses.filter((w: any) => w.isGroup))
  }

  createWarehouse(isGroup: boolean = false) {
    let data: any = {}

    if (isGroup) {
      data = this.createWarehouseGroupForm.value
    } else {
      data = this.createWarehouseForm.value
    }

    data.parentId = data.parentId?._id
    data.responsibles = data.responsibles.map((r: any) => {
      return {
        ref: r
      }
    })

    this.currentCompany.datasets.warehouses.push(data)
    this.updateCompany()
    this.dialogStage.isCreateWarehouse = false
    this.dialogStage.isCreateWarehousesGroup = false
  }

  onEdit(data: any, element: any, field: string) {
    clearTimeout(this.editTimeout)
    console.log(element);


    this.editTimeout = setTimeout(() => {
      switch (field) {
        case 'responsibles': {
          data = data.map((r: any) => {
            return {
              ref: r._id
            }
          })

          break
        }
      }


      const index = this.currentCompany.datasets.warehouses.findIndex((w: any) => w._id === element._id)

      if (index !== -1) {
        this.currentCompany.datasets.warehouses[index][field] = data
        this.updateCompany(false)
      }
    }, 600)
  }

  updateCompany(reInit: boolean = true) {
    this.subscription.add(this.accCompaniesService.update(this.currentCompany).subscribe({
      next: () => {
        if (reInit) {
          this.init()
        }
      }
    }))
  }
}
