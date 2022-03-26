import { Component, Input, OnInit } from '@angular/core';
import { InventoryItem } from '../model/inventory/inventory-item';

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.css']
})
export class InventoryItemComponent implements OnInit {

  @Input() Item!: InventoryItem;

  constructor() { }

  ngOnInit(): void {
  }

}
