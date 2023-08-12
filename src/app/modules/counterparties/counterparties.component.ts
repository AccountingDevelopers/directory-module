import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AccSystemService, AccCompaniesService, AccDialogService } from 'ng-accounting';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-counterparties',
  templateUrl: './counterparties.component.html',
  styleUrls: ['./counterparties.component.scss']
})
export class CounterpartiesComponent  implements OnInit {
  constructor(private readonly accSystemService: AccSystemService, private readonly accCompaniesService: AccCompaniesService, public readonly accDialogService: AccDialogService) { }

  dialogStage: any = {
    isCreateElement: false,
    isCreateElementGroup: false
  }
  responsibles: any[] = []
  elementGroups: any[] = []
  elementsDataTable: any[] = []
  elementTypes: any[] = [
    {
      label: 'Юридическое лицо',
      value: 'warehouse'
    },
    {
      label: 'Индивидуальный предприниматель',
      value: 'retailStore'
    },
    {
      label: 'Физическое лицо',
      value: 'nonAutomatedOutlet'
    },
    {
      label: 'Самозанятый',
      value: 'nonAutomatedOutlet'
    },
    {
      label: 'Обособленное подразделение',
      value: 'nonAutomatedOutlet'
    },
    {
      label: 'Государственный орган',
      value: 'nonAutomatedOutlet'
    }
  ]
  editTimeout!: any
  currentCompany!: any
  subscription: Subscription = new Subscription()

  createElementForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    code: new FormControl(null),
    parentId: new FormControl(null),
    type: new FormControl(null),
    description: new FormControl(null),
    responsibles: new FormControl(null),
    children: new FormControl([])
  })

  createElementsGroupForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    parentId: new FormControl(null),
    isGroup: new FormControl(true),
    children: new FormControl([])
  })

  ngOnInit(): void {
    this.responsibles = this.accSystemService.users
  }

  init() {
    this.currentCompany = this.accSystemService.currentCompany
  }

  createElement(reInit: boolean = true) {

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
        case 'label': {
          const splitedField = field.split('.')
          data = {
            [splitedField[0]]: data,
            ...element.label
          }

          break
        }
      }


      const index = this.currentCompany.datasets.counterpaties.findIndex((w: any) => w._id === element._id)

      if (index !== -1) {
        this.currentCompany.datasets.counterpaties[index][field] = data
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
