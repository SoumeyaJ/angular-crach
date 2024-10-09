import {Component, OnInit} from '@angular/core';
import {Task} from "../../Task";
// import {TASKS} from "../../mock-tasks";
import {TaskService} from "../../services/task.service";
import {NgForOf} from "@angular/common";
import {TaskItemComponent} from "../task-item/task-item.component";
import {catchError, firstValueFrom, lastValueFrom, Observable, of, switchMap} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {AddTaskComponent} from "../add-task/add-task.component";


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    NgForOf,
    TaskItemComponent,
    AddTaskComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  // deleteTask(task: Task) {
  //
  //   this.taskService
  //     .deleteTask(task).subscribe(
  //     () => this.tasks = this.tasks.filter(t => t.id !== task.id));
  //
  // }

  // deleteTask(task: Task): void {
  //   this.taskService.deleteTask(task).subscribe(() => {
  //       // Mettre à jour la liste des tâches après la suppression
  //       this.tasks = this.tasks.filter(t => t.id !== task.id);
  //     },
  //     error => {
  //       console.error('Error deleting task !', error);
  //
  //     });
  // }


  deleteTask(task: Task): void {
    firstValueFrom(this.taskService.deleteTask(task))
      .then(() => {
        // Update task's list after deletion
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      })
      .catch(error => {
        console.error('Error deleting task!', error);
      });
  }


  // toggleReminder(task: Task) {
  //   task.reminder = !task.reminder;
  //   this.taskService.updateTaskReminder(task).subscribe();
  // }


  toggleReminder = async (task: Task) => {
    try {
      task.reminder = !task.reminder;
      const updatedTask = await lastValueFrom(this.taskService.updateTaskReminder(task));
      console.log('Task updated', updatedTask);
    } catch (error) {
      console.error('Error while updating', error);
    }
  }


  // toggleReminder(task: Task) {
  //   task.reminder = !task.reminder;
  //
  //   this.taskService.updateTaskReminder(task)
  //     .then(updatedTask => {
  //       console.log('Rappel mis à jour avec succès', updatedTask);
  //       // Mettre à jour l'objet local avec les données renvoyées par le serveur
  //       task = updatedTask;
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de la mise à jour du rappel', error);
  //     });
  // }


  addTask(task: Task) {
    // console.log(task)
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));


  }
}
