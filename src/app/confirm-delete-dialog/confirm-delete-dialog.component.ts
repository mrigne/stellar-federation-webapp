import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountsService } from '../services/accounts.service';
import { ConfigService } from '../services/config.service';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.styl']
})
export class ConfirmDeleteDialogComponent implements OnInit {
  public stellarSuffix = this.configService.getConfig().then(config => `*${config.stellarFederationDomain}`);

  constructor(public dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public accountsHelper: AccountsService,
              public snackBarHelper: SnackBarService,
              private configService: ConfigService) { }

  public ngOnInit(): void {
  }

  public onNoClick(): void {
      this.dialogRef.close({
          update: false
      });
  }

  public async onYesClick(): Promise<void> {
      try {
          const config = await this.configService.getConfig();
          await this.accountsHelper.deleteAccount(this.data.federation.replace(`*${config.stellarFederationDomain}`, ''));
          this.dialogRef.close({
              update: true
          });
      } catch (e) {
          console.error(e);
          this.snackBarHelper.showSnack(e.status === 401 ? 'You are not authorized' : e.message, true, 10);
          this.dialogRef.close({
              update: false
          });
      }
  }

}
