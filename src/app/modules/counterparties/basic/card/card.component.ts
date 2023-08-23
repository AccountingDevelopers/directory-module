import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}
  activeItem!: any
  menuList: MenuItem[] = [
    {
      label: 'Основное',
      icon: 'pi pi-fw pi-home',
      routerLink: 'basic'
    },
    {
      label: 'Документи',
      icon: 'pi pi-fw pi-home',
      routerLink: 'documents'
    }
  ]

  ngOnInit(): void {
    this.activeItem = this.menuList[0]
    console.log(this.activeItem);
    this.changeDetectorRef.detectChanges()
  }
}
