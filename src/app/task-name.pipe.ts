import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskName'
})
export class TaskNamePipe implements PipeTransform {

  transform(tasks: Array<any>, search: string) {
    if (!tasks || !search) {
      return tasks;
    }

    return tasks.filter(task =>
      task.name.toLowerCase().indexOf(search.toLowerCase()) !== -1);
  }

}
