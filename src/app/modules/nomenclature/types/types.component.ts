import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccSystemService, AccCompaniesService, AccTableService, setValueByPath } from 'ng-accounting';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {
  constructor(private readonly accSystemService: AccSystemService, private readonly accCompaniesService: AccCompaniesService, private readonly accTableService: AccTableService) { }

  currentCompany!: any
  moduleData!: any
  dialogStage: any = {
    isCreateElement: false,
  }
  subscription: Subscription = new Subscription()

  createElementForm: FormGroup = new FormGroup({
    label: new FormControl(null)
  })

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.currentCompany = this.accSystemService.currentCompany
    this.moduleData = this.currentCompany.datasets.nomenclatures.types
  }

  createElement() {
    const data = this.createElementForm.value
    this.moduleData.elements.push(data)
    this.currentCompany = setValueByPath(this.currentCompany, 'nomenclatures.types', this.moduleData)
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
