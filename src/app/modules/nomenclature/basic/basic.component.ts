import { FormControl, FormGroup } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { AccSystemService, convertArrayToTree, AccCompaniesService, setValueByPath, AccTableService } from 'ng-accounting';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  constructor(private readonly accSystemService: AccSystemService, private readonly accCompaniesService: AccCompaniesService, private readonly accTableService: AccTableService) { }

  currentCompany!: any
  moduleData!: any
  elementsGroups: any[] = []
  subscription: Subscription = new Subscription()

  dialogStage: any = {
    isCreateElement: false,
    isCreateElementsGroup: false
  }

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
    this.moduleData = this.currentCompany.datasets.nomenclatures.basic
    this.elementsGroups = convertArrayToTree(this.moduleData.elements.filter((e: any) => e.isGroup))
  }

  createElement(isGroup: boolean = false) {
    const data = isGroup ? this.createNomenclaturesGroupForm.value : this.createNomenclaturesForm.value
    data.parentId = data.parentId?._id

    this.moduleData.elements.push(data)
    this.currentCompany = setValueByPath(this.currentCompany, 'numenclatures.basic', this.moduleData)
    this.subscription.add(this.accCompaniesService.update(this.currentCompany).subscribe({
      next: ({ company }) => {
        this.currentCompany = company
        this.dialogStage.isCreateElement = false
        this.dialogStage.isCreateElementsGroup = false
        this.init()
        this.accTableService.emit('reloadTable', {
          elements: this.moduleData.elements
        })
      }
    }))
  }
}
