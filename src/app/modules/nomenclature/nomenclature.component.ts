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
    isCreateNumenclature: false
  }

  data = [
    {
      _id: 1,
      label: 'Nomenclature 1',
      data: '123',
      parentId: null,
      children: []
    },
    {
      _id: 2,
      label: 'Nomenclature 2',
      data: '42342',
      parentId: 1,
      children: []
    }
  ]

  nomenclaturesDataTable: any[] = []
  nomenclatures: any[] = []
  currentCompany!: any
  subscription: Subscription = new Subscription()

  createNomenclaturesForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    parentId: new FormControl(null),
    code: new FormControl(null),
    article: new FormControl(null),
    description: new FormControl(null),
    children: new FormControl([]),
  })

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.currentCompany = this.accSystemService.currentCompany
    const companyNomenclatures = this.currentCompany.datasets.nomenclatures
    this.nomenclaturesDataTable = convertArrayToTree(companyNomenclatures, { isWrapedInData: true })
    this.nomenclatures = convertArrayToTree(companyNomenclatures)
  }

  createNomenclature() {
    const data = this.createNomenclaturesForm.value
    data.parentId = data.parentId?._id

    this.currentCompany.datasets.nomenclatures.push(data)

    this.subscription.add(this.accCompaniesService.update(this.currentCompany).subscribe({
      next: () => {
        this.init()
        this.dialogStage.isCreateNumenclature = false
      }
    }))
  }
}
