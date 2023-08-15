import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccSystemService, AccCompaniesService, convertArrayToTree, WAREHOUSE_TYPES } from 'ng-accounting';
import { Subscription } from 'rxjs';
import { AccTableService } from 'ng-accounting'

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss']
})
export class WarehousesComponent {
  constructor(
    public readonly accSystemService: AccSystemService,
    private readonly accCompaniesService: AccCompaniesService,
    private readonly accTableService: AccTableService
  ) { }

  moduleData!: any
  dialogStage: any = {
    isCreateElement: false,
    isCreateElementsGroup: false
  }

  loadingConfig: any = {
    isLoadingContent: false
  }

  elements: any[] = []
  fields: any[] = []
  elementsGroups: any[] = []
  currentCompany!: any
  subscription: Subscription = new Subscription()
  elementsTypes: any[] = WAREHOUSE_TYPES

  createWarehouseForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    code: new FormControl(null),
    parentId: new FormControl(null),
    type: new FormControl(null),
    description: new FormControl(null),
    responsibles: new FormControl([]),
    children: new FormControl([])
  })

  createWarehouseGroupForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    parentId: new FormControl(null),
    isGroup: new FormControl(true),
    children: new FormControl([])
  })

  ngOnInit(): void {
    this.currentCompany = this.accSystemService.currentCompany
    this.init()
  }

  init() {
    this.elements = this.currentCompany.datasets.warehouses.elements
    this.elementsGroups = convertArrayToTree(this.elements.filter((e: any) => e.isGroup))
    this.fields = this.currentCompany.datasets.warehouses.fields
    this.loadingConfig.isLoadingContent = false
  }

  createElement(isGroup: boolean = false) {
    let data: any = {}

    if (isGroup) {
      data = this.createWarehouseGroupForm.value
    } else {
      data = this.createWarehouseForm.value
      data.responsibles = data.responsibles.map((r: any) => {
        return {
          ref: r
        }
      })
    }

    data.parentId = data.parentId?._id

    this.currentCompany.datasets.warehouses.elements.push(data)
    this.updateCompany()
    this.closeDialogs()
  }

  closeDialogs() {
    this.dialogStage.isCreateElement = false
    this.dialogStage.isCreateElementsGroup = false
  }

  updateCompany() {
    this.loadingConfig.isLoadingContent = true
    this.subscription.add(this.accCompaniesService.update(this.currentCompany).subscribe({
      next: ({ company }) => {
        this.currentCompany = company
        this.accTableService.emit('reloadTable', {
          elements: company.datasets.warehouses.elements
        })
        this.init()
      }
    }))
  }
}
