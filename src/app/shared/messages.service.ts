import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private snackBar: MatSnackBar) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 10000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  errorHandler(msg: string, isError: boolean = true): typeof EMPTY {
    this.showMessage(msg, isError);

    return EMPTY;
  }

}
