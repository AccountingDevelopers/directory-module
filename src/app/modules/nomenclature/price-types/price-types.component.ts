import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AccCompaniesService, AccSystemService, AccTableService, setValueByPath } from 'ng-accounting';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-price-types',
  templateUrl: './price-types.component.html',
  styleUrls: ['./price-types.component.scss']
})
export class PriceTypesComponent implements OnInit {
  constructor(private readonly accSystemService: AccSystemService, private readonly accCompaniesService: AccCompaniesService, private readonly accTableService: AccTableService) { }

  currentCompany!: any
  moduleData!: any
  subscription: Subscription = new Subscription()

  dialogStage: any = {
    isCreateElement: false
  }

  createElementForm: FormGroup = new FormGroup({
    label: new FormControl(null)
  })


  ngOnInit(): void {
    this.init()
  }

  init() {
    this.currentCompany = this.accSystemService.currentCompany
    this.moduleData = this.currentCompany.datasets.nomenclatures.priceTypes
  }

  createElement() {
    const data = this.createElementForm.value
    this.moduleData.elements.push(data)
    this.currentCompany = setValueByPath(this.currentCompany, 'nomenclatures.priceTypes', this.moduleData)
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
