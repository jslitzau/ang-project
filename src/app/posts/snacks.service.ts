import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarModule } from '@angular/material';

@Injectable({providedIn: 'root'})
export class SnacksService {

  constructor(private snackBar: MatSnackBar) { }

  public showSnacks(message: string) {
    this.snackBar.open(message, 'Dismiss', {duration: 2000});
  }
}
