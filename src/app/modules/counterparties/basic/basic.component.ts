import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccStoreService, AccTableService, convertArrayToTree } from 'ng-accounting';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  constructor(
    private readonly accTableService: AccTableService,
    private readonly accStoreService: AccStoreService
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
}
