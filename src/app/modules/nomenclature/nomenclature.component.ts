import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nomenclature',
  templateUrl: './nomenclature.component.html',
  styleUrls: ['./nomenclature.component.scss']
})
export class NomenclatureComponent implements OnInit {
  activeItem!: any
  menuList: MenuItem[] = [
    {
      label: 'Основное',
      icon: 'pi pi-fw pi-home',
      routerLink: 'basic'
    },
    {
      label: 'Виды номенклатуры',
      icon: 'pi pi-fw pi-home',
      routerLink: 'types'
    },
    {
      label: 'Типы цен номенклатуры',
      icon: 'pi pi-fw pi-home',
      routerLink: 'priceTypes'
    }
  ]

  ngOnInit(): void {
    this.activeItem = this.menuList[0]
  }
}
