import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalManager } from 'ngb-modal';
import { TaskService } from '../task.service';

@Component({
  selector: 'task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

  @ViewChild('editTaskModal') editTaskModal;
  @ViewChild('deleteTaskModal') deleteTaskModal;
  private modalRef;

  @Input() name: String;
  @Input() id: number;
  @Input() description: String;
  @Input() date: String;
  @Input() done: boolean;
  public statusText: String;

  @Output() listTasksEvent = new EventEmitter<any>();

  editTaskForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    done: [''],
  })

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private modalService: ModalManager
  ) { }

  ngOnInit(): void {
    if (this.done) {
      this.statusText = "Feita";
    } else {
      this.statusText = "To Do";
    }
  }

  onSubmit() {
    const data = {
      name: this.editTaskForm.get("name").value,
      done: this.editTaskForm.get("done").value ? '0' : '1',
      description: this.editTaskForm.get("description").value,
      id: this.id
    };
    this.taskService.updateTask(data).subscribe(() => {
      this.listTasksEvent.emit();
    });
    this.closeModal();
  }

  deleteTask() {
    this.taskService.deleteTask(this.id).subscribe(() => {
      this.listTasksEvent.emit();
      this.closeModal();
    });
  }

  openDeleteModal() {
    this.modalRef = this.modalService.open(this.deleteTaskModal, {
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

    this.editTaskForm.patchValue({ name: this.name, description: this.description });
  }

  openEditModal() {
    this.modalRef = this.modalService.open(this.editTaskModal, {
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

    this.editTaskForm.patchValue({ name: this.name, description: this.description, done: this.done });
  }

  closeModal() {
    this.modalService.close(this.modalRef);
  }
}
