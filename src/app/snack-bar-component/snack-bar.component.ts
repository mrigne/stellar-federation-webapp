import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-component',
  templateUrl: './snack-bar-component.component.html',
  styleUrls: ['./snack-bar-component.component.styl']
})
export class SnackBarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              private snackRef: MatSnackBarRef<SnackBarComponent>) { }

  public ngOnInit(): void {
  }

  public closeSnack(): void {
      if (this.data.isClosable) {
          this.snackRef.dismiss();
      }
  }

}
