import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccStoreService, AccTableService, convertArrayToTree } from 'ng-accounting';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  constructor(
    private readonly accTableService: AccTableService,
    private readonly accStoreService: AccStoreService,
    private readonly router: Router
  ) { }

  dialogStage: any = {
    isCreateElement: false,
    isCreateElementsGroup: false
  }

  elementsGroups: any[] = []
  createElementForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    parentId: new FormControl(null),
    isGroup: new FormControl(false)
  })

  createElementsGroupForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    parentId: new FormControl(null),
    isGroup: new FormControl(true)
  })

  ngOnInit(): void {
    this.init()
  }

  async init() {
    const elements = await this.accStoreService.get({
      type: 'basic',
      identifier: 'counterparties'
    }, 'elements')
    this.elementsGroups = convertArrayToTree(elements.filter((e: any) => e.isGroup))
  }

  createElement(isGroup: boolean = false) {
    const data = isGroup ? this.createElementsGroupForm.value : this.createElementForm.value
    this.accTableService.createElement(data)
    this.closeDialogs()
  }

  closeDialogs() {
    this.dialogStage.isCreateElement = false
    this.dialogStage.isCreateElementsGroup = false
  }

  openCard(event: any) {
    const elementId = event.element?.node?.data._id || event.element?._id
    this.router.navigate(['counterparties', 'basic', elementId])
  }
}
