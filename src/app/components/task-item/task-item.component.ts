import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Task} from "../../Task";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NgClass, NgStyle} from "@angular/common";
import {colors} from "@angular/cli/src/utilities/color";

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    FaIconComponent,
    NgStyle,
    NgClass
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter()
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter()
  faTimes = faTimes;

  onDelete() {
    // console.log(this.task)
    this.onDeleteTask.emit(this.task)

  }

  onToggle() {

    this.onToggleReminder.emit(this.task)

  }
}
