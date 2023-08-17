import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AccTableService } from 'ng-accounting';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {
  constructor(
    private readonly accTableService: AccTableService
  ) { }

  dialogStage = {
    isCreateElement: false
  }

  createElementForm: FormGroup = new FormGroup({
    label: new FormControl(null)
  })

  ngOnInit(): void { }

  createElement() {
    const data = this.createElementForm.value
    this.accTableService.createElement(data)
    this.dialogStage.isCreateElement = false
  }
}
