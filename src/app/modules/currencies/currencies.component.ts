import { FormGroup, FormControl } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { AccSystemService, AccCompaniesService, AccDialogService } from 'ng-accounting';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss']
})
export class CurrenciesComponent implements OnInit {
  constructor(
    private readonly accSystemService: AccSystemService,
    private readonly accCompaniesService: AccCompaniesService,
    public readonly accDialogService: AccDialogService
  ) { }

  dialogStage: any = {
    isCreateElement: false,
    isCreateElementsGroup: false
  }
  moduleData!: any
  editTimeout!: any
  elementsDataTable: any[] = []

  elements: any[] = []
  fields: any[] = []

  subscription: Subscription = new Subscription()
  currentCompany!: any
  createElementForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    codes: new FormGroup({
      digital: new FormControl(null),
      symbolic: new FormControl(null)
    })
  })

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.currentCompany = this.accSystemService.currentCompany
    this.elements = this.currentCompany.datasets.currencies.elements
    this.fields = this.currentCompany.datasets.currencies.fields
  }

  onEdit(data: any, element: any, field: string) {
    clearTimeout(this.editTimeout)

    this.editTimeout = setTimeout(() => {
      if (field.includes('codes')) {
        const [_, fld] = field.split('.')
        element.codes[fld] = data
      } else {
        element[field] = data
      }

      const index = this.currentCompany.datasets.currencies.elements.findIndex((w: any) => w._id === element._id)

      if (index !== -1) {
        this.currentCompany.datasets.currencies.elements[index][field] = data
        this.updateCompany(false)
      }
    }, 600)
  }

  createElement() {
    const data = this.createElementForm.value
    this.currentCompany.datasets.currencies.elements.push(data)
    this.updateCompany()
    this.dialogStage.isCreateElement = false
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
