import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalManager } from 'ngb-modal';
import { TaskService } from './task.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private modalService: ModalManager,
    private formBuilder: FormBuilder
  ) { }

  @ViewChild('newTaskModal') newTaskModal;
  private modalRef;

  public tasks: any[] = [];
  public search: string;

  addTaskForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  })

  ngOnInit(): void {
    this.listAllTasks();
  }

  listAllTasks(): void {
    this.taskService.listAllTasks().subscribe((data: any) => {
      this.tasks = data;
    });
  }

  onSubmit() {
    this.taskService.addNewTask(this.addTaskForm.value).subscribe(() => {
      this.listAllTasks();
      this.closeModal();
    });
  }

  openModal() {
    this.modalRef = this.modalService.open(this.newTaskModal, {
      size: "md",
      modalClass: 'mymodal',
      hideCloseButton: true,
      centered: true,
      backdrop: true,
      animation: true,
      keyboard: false,
      closeOnOutsideClick: true,
      backdropClass: "modal-backdrop"
    })
  }

  closeModal() {
    this.modalService.close(this.modalRef);
    this.addTaskForm.reset();
  }
}
