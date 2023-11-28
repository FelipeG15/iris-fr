import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, NgbToastModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  private readonly taskService = inject(TaskService);
  @Input() title: string = '';
  @Input() id: number = 0;
  @Input() completed: boolean = false;

  @Output() reloadList = new EventEmitter<void>();

  show = true;

  close(): void {
    this.show = false;
    this.deleteTask();
  }

  completeTask(): void {
    this.taskService.completeTask(this.id).subscribe(() => {
      this.reloadList.emit();
    });
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.id).subscribe(() => {
      this.reloadList.emit();
    });
  }
}
