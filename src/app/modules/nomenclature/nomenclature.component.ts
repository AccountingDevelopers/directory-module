import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccCompaniesService, AccSystemService, convertArrayToTree, convertTreeToArray } from 'ng-accounting';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.scss']
})
export class NomenclatureComponent implements OnInit {
  constructor(private readonly accSystemService: AccSystemService, private readonly accCompaniesService: AccCompaniesService) { }

  dialogStage: any = {
    isCreateElement: false,
    isCreateElementsGroup: false
  }

  elements: any[] = []
  fields: any[] = []
  elementsGroups: any[] = []
  currentCompany!: any
  subscription: Subscription = new Subscription()

  createNomenclaturesForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    parentId: new FormControl(null),
    code: new FormControl(null),
    article: new FormControl(null),
    description: new FormControl(null),
    children: new FormControl([]),
    isGroup: new FormControl(false)
  })

  createNomenclaturesGroupForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    parentId: new FormControl(null),
    isGroup: new FormControl(true)
  })

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.currentCompany = this.accSystemService.currentCompany
    this.elements = this.currentCompany.datasets.nomenclatures.elements
    this.elementsGroups = this.elements.filter((e: any) => e.isGroup)
    this.fields = this.currentCompany.datasets.nomenclatures.fields
  }

  createElement(isGroup: boolean = false) {
    const data = isGroup ? this.createNomenclaturesGroupForm.value : this.createNomenclaturesForm.value
    data.parentId = data.parentId?._id

    this.currentCompany.datasets.nomenclatures.elements.push(data)
    this.subscription.add(this.accCompaniesService.update(this.currentCompany).subscribe({
      next: () => {
        this.init()
        this.dialogStage.isCreateElement = false
        this.dialogStage.isCreateElementsGroup = false
      }
    }))
  }

  updateElement(response: {element: any, field: any}) {

  }
}
