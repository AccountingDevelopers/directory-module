import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AccSystemService, AccCompaniesService, AccDialogService, convertArrayToTree } from 'ng-accounting';
import { Dropdown } from 'primeng/dropdown';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-counterparties',
  templateUrl: './counterparties.component.html',
  styleUrls: ['./counterparties.component.scss']
})
export class CounterpartiesComponent implements OnInit {
  constructor(private readonly accSystemService: AccSystemService, private readonly accCompaniesService: AccCompaniesService, public readonly accDialogService: AccDialogService) { }

  dialogStage: any = {
    isCreateElement: false,
    isCreateElementsGroup: false
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
    label: new FormGroup({
      inDocs: new FormControl(null),
      inSystem: new FormControl(null)
    }),
    code: new FormControl(null),
    parentId: new FormControl(null),
    description: new FormControl(null),
    responsibles: new FormControl([]),
    country: new FormControl(null),
    children: new FormControl([]),
    tax: new FormGroup({
      number: new FormControl(null)
    }),
    tin: new FormControl(null),
    cor: new FormControl(null),
    registerNumber: new FormControl(null),
    bankAccount: new FormGroup({
      bank: new FormControl(null),
      number: new FormControl(null)
    }),
    addresses: new FormGroup({
      legal: new FormControl(null),
      actual: new FormControl(null),
      post: new FormControl(null)
    }),
    contacts: new FormGroup({
      emails: new FormControl([]),
      phones: new FormControl([])
    }),
    contactPerson: new FormGroup({
      addresses: new FormGroup({
        legal: new FormControl(null),
        actual: new FormControl(null),
        post: new FormControl(null)
      }),
      contacts: new FormGroup({
        emails: new FormControl([]),
        phones: new FormControl([])
      })
    })
  })

  createElementsGroupForm: FormGroup = new FormGroup({
    label: new FormGroup({
      inSystem: new FormControl(null)
    }),
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
    this.elementsDataTable = convertArrayToTree(this.currentCompany.datasets.counterparties, { isWrapedInData: true })
    this.elementGroups = convertArrayToTree(this.currentCompany.datasets.counterparties.filter((c: any) => c.isGroup)).map((c: any) => {
      return {
        ...c,
        label: c.label.inSystem
      }
    })
  }

  createElement(isGroup: boolean = false) {
    const data = isGroup ? this.createElementsGroupForm.value : this.createElementForm.value
    data.parentId = data.parentId?._id

    this.currentCompany.datasets.counterparties.push(data)
    this.updateCompany(isGroup)
    this.dialogStage.isCreateElement = false
    this.dialogStage.isCreateElementsGroup = false
  }

  onEdit(data: any, element: any, field: string) {
    clearTimeout(this.editTimeout)

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


      const index = this.currentCompany.datasets.counterparties.findIndex((w: any) => w._id === element._id)

      if (index !== -1) {
        this.currentCompany.datasets.counterparties[index][field] = data
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
