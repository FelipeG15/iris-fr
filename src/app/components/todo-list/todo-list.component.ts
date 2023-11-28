import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../../services/task/task.service';
import { TaskComponent } from '../task/task.component';
import { Filters } from '../../constants/constans';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbToastModule, TaskComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  todos: any[] = [];
  todosInit: any[] = [];
  newTodo: string = '';
  filter: string = 'All';
  filters: any[] = Object.values(Filters);


  ngOnInit(): void {
    this.getAll();
  }

  applyFilter(): void {
    if(this.filter === Filters.ALL)
      this.todos = this.todosInit;
    else
      this.todos = this.todosInit.filter(x => x.completed === (this.filter === Filters.COMPLETED));
  }

  getAll(): void {
    this.taskService.getTodos().subscribe(data => {
      this.todosInit = data;
      this.applyFilter();
    });
  }

  addTodo() {
    if (this.newTodo.trim() === '') {
      return;
    }
    this.taskService.addTodo({ title: this.newTodo, completed: false }).subscribe(() => {
      this.getAll();
      this.newTodo = '';
    });
    return;
  }
}
