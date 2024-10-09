import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  imports: [
    NgStyle
  ],
  standalone: true
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() color!: string;
  @Output() btnClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick() {
    this.btnClick.emit();
  }
}
