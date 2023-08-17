import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-counterparties',
  templateUrl: './counterparties.component.html',
  styleUrls: ['./counterparties.component.scss']
})
export class CounterpartiesComponent implements OnInit {
  activeItem!: any
  menuList: MenuItem[] = [
    {
      label: 'Основное',
      icon: 'pi pi-fw pi-home',
      routerLink: 'basic'
    }
  ]

  ngOnInit(): void {
    this.activeItem = this.menuList[0]
  }
}
