import {FormGroup, FormControl} from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { AccSystemService, AccCompaniesService, AccDialogService, setValueByPath, AccTableService } from 'ng-accounting';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  constructor(
    private readonly accSystemService: AccSystemService,
    private readonly accCompaniesService: AccCompaniesService,
    public readonly accDialogService: AccDialogService,
    private readonly accTableService: AccTableService
  ) { }

  dialogStage: any = {
    isCreateElement: false,
    isCreateElementsGroup: false
  }
  currentCompany!: any
  moduleData!: any
  subscription: Subscription = new Subscription()
  createElementForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    symbol: new FormControl(null),
    code: new FormControl(null)
  })


  ngOnInit(): void {
    this.init()
  }

  init() {
    this.currentCompany = this.accSystemService.currentCompany
    this.moduleData = this.currentCompany.datasets.units
  }

  createElement() {
    const data = this.createElementForm.value

    this.moduleData.elements.push(data)
    this.currentCompany = setValueByPath(this.currentCompany, 'units', this.moduleData)
    this.subscription.add(this.accCompaniesService.update(this.currentCompany).subscribe({
      next: ({ company }) => {
        this.currentCompany = company
        this.dialogStage.isCreateElement = false
        this.init()
        this.accTableService.emit('reloadTable', {
          elements: this.moduleData.elements
        })
      }
    }))
  }
}
