import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AccSystemService, AccCompaniesService, AccDialogService, convertArrayToTree, COUNTERPARTY_TYPES, AccTableService } from 'ng-accounting';
import { Dropdown } from 'primeng/dropdown';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-counterparties',
  templateUrl: './counterparties.component.html',
  styleUrls: ['./counterparties.component.scss']
})
export class CounterpartiesComponent implements OnInit {
  constructor(public readonly accSystemService: AccSystemService, private readonly accCompaniesService: AccCompaniesService, public readonly accDialogService: AccDialogService,
    private readonly accTableService: AccTableService) { }

  dialogStage: any = {
    isCreateElement: false,
    isCreateElementsGroup: false
  }

  elementsDataTable: any[] = []
  elementTypes: any[] = COUNTERPARTY_TYPES
  editTimeout!: any
  currentCompany!: any
  subscription: Subscription = new Subscription()

  elements: any[] = []
  elementGroups: any[] = []
  fields: any[] = []

  createElementForm: FormGroup = new FormGroup({
    label: new FormControl(null),
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
    this.elements = this.currentCompany.datasets.counterparties.elements
    this.elementGroups = convertArrayToTree(this.elements.filter((e: any) => e.isGroup))
    this.fields = this.currentCompany.datasets.counterparties.fields
  }

  createElement(isGroup: boolean = false) {
    let data: any = {}

    if (isGroup) {
      data = this.createElementsGroupForm.value
    } else {
      data = this.createElementForm.value
      data.responsibles = data.responsibles.map((r: any) => {
        return {
          ref: r
        }
      })
    }

    data.parentId = data.parentId?._id

    this.currentCompany.datasets.counterparties.elements.push(data)
    this.updateCompany(isGroup)
    this.closeDialogs()
  }

  closeDialogs() {
    this.dialogStage.isCreateElement = false
    this.dialogStage.isCreateElementsGroup = false
  }

  updateCompany(reInit: boolean = true) {
    this.subscription.add(this.accCompaniesService.update(this.currentCompany).subscribe({
      next: ({ company }) => {
        this.currentCompany = company
        this.accTableService.emit('reloadTable', {
          elements: company.datasets.counterparties.elements
        })
        this.init()
      }
    }))
  }
}
