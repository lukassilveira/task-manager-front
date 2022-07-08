import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  private modalRef;

  @Input() name: String;
  @Input() description: String;
  @Input() date: String;
  @Input() isDone: boolean;
  public statusText: String;

  editTaskForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  })

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private modalService: ModalManager
  ) { }

  ngOnInit(): void {
    if (this.isDone) {
      this.statusText = "Done";
    } else {
      this.statusText = "To Do";
    }
  }

  onSubmit() {
    
  }

  openModal() {
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
    
    this.editTaskForm.patchValue({name: this.name, description: this.description});
  }
}
