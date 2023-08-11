import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { convertArrayToTree, convertTreeToArray } from 'ng-accounting';

@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.scss']
})
export class NomenclatureComponent implements OnInit {
  dialogStage: any = {
    isCreateNumenclature: false
  }

  data = [
    {
      _id: 1,
      label: 'Nomenclature 1',
      data: '123',
      parentId: null,
      children: []
    },
    {
      _id: 2,
      label: 'Nomenclature 2',
      data: '42342',
      parentId: 1,
      children: []
    }
  ]

  nomenclaturesDataTable: any[] = []
  nomenclatures: any[] = []

  createNomenclaturesForm: FormGroup = new FormGroup({
    label: new FormControl(null),
    parentId: new FormControl(null),
    children: new FormControl([]),
  })

  ngOnInit(): void {
    this.init()
  }

  init() {
    this.nomenclaturesDataTable = convertArrayToTree(this.data, { isWrapedInData: true })
    this.nomenclatures = convertArrayToTree(this.data)

    console.log(this.nomenclaturesDataTable);

  }

  createNomenclature() {
    const data = this.createNomenclaturesForm.value
    data.parentId = data.parentId._id
    console.log(data);

    this.data.push(data)
    this.init()
    this.dialogStage.isCreateNumenclature = false
  }
}
