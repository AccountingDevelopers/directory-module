import { FormControl, FormGroup } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { convertArrayToTree, AccTableService, } from 'ng-accounting';
import { AccStoreService } from 'ng-accounting';

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

  elementsGroups: any[] = []

  dialogStage: any = {
    isCreateElement: false,
    isCreateElementsGroup: false
  }

  createElementForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    parentId: new FormControl(null),
    code: new FormControl(null),
    article: new FormControl(null),
    description: new FormControl(null),
    children: new FormControl([]),
    isGroup: new FormControl(false),
    nomenclatureTypes: new FormControl(null)
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
      identifier: 'nomenclatures'
    }, 'elements')

    console.log('elements', elements);
    
    this.elementsGroups = convertArrayToTree(elements.filter((e: any) => e.isGroup))
  }

  createElement(isGroup: boolean = false) {
    const data = isGroup ? this.createElementsGroupForm : this.createElementForm.value
    this.accTableService.createElement(data)
    this.closeDialogs()
  }

  closeDialogs() {
    this.dialogStage.isCreateElement = false
    this.dialogStage.isCreateElementsGroup = false
  }
}
