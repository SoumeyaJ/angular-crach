import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Task } from "../Task";
import {HttpHeaders} from "@angular/common/http";

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//   }),
// };

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:5000/tasks';
  private httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  constructor() {}

  // Méthode pour récupérer les tâches à partir de l'API avec fetch
  getTasks(): Observable<Task[]> {
    // Utilisation de `fetch` et conversion en Observable
    const tasksPromise = fetch(this.apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network error has been detected');
        }
        return response.json();
      });
    // Convertir la promesse en Observable
    return from(tasksPromise);
  }

  deleteTask(task: Task): Observable<any> {
    const url = `${this.apiUrl}/${task.id}`;
    return from(fetch(url, {method: 'DELETE'}));
  }

  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;

    // Convertir la Promise retournée par fetch en Observable avec from()
    return from(
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Ajoutez ici d'autres en-têtes comme un token d'authentification si nécessaire
        },
        body: JSON.stringify(task)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error HTTP : ${response.status}`);
          }
          // Retourne les données JSON après vérification de la réponse
          return response.json();
        })
        .catch(error => {
          console.error('Error while updating', error);
          throw error;  // Propager l'erreur pour la gestion dans l'Observable
        })
    );
  }

  // updateTaskReminder(task: Task): Observable<Task> {
  //   const url = `${this.apiUrl}/${task.id}`;
  //   return this.http.put<Task>(url, task, this.httpOptions);
  // }

  // addTask(task: Task): Observable<Task> {
  //   return this.http.post<Task>(this.apiUrl, task, this.httpOptions)
  //
  // }



  addTask(task: Task): Observable<Task> {
    return new Observable(observer => {
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

}
