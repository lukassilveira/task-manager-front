import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
  constructor(
    private httpClient: HttpClient
  ) { }


  public listAllTasks() {
    return this.httpClient.get(`http://localhost:8080/task/all`);
  }

  public addNewTask(task) {    
    return this.httpClient.post(`http://localhost:8080/task/add`, task)
  }
}
