import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAccount } from '../../interfaces/account.interface';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { ConfigService } from '../services/config.service';
import { SnackBarService } from '../services/snack-bar.service';
import { MatSelectChange } from '@angular/material/select';
import { MemoType } from '../../enums/memo-type.enum';

@Component({
    selector: 'app-add-account-dialog',
    templateUrl: './add-account-dialog.component.html',
    styleUrls: ['./add-account-dialog.component.styl']
})
export class AddAccountDialogComponent implements OnInit, OnDestroy {
    public memoTypes = Object.values(MemoType);
    public formGroupObject: FormGroup;
    public federationControl = new FormControl(null, Validators.required);
    public addressControl = new FormControl(null, Validators.required);
    public memoTypeControl = new FormControl();
    public memoControl = new FormControl(null, Validators.required);
    public disabledButton = false;
    public stellarSuffix = this.configService.getConfig().then(config => `*${config.stellarFederationDomain}`);

    constructor(
        public dialogRef: MatDialogRef<AddAccountDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IAccount,
        private fb: FormBuilder,
        private accountsService: AccountsService,
        private configService: ConfigService,
        private snackHelper: SnackBarService) {}

    public onCancelClick(): void {
        this.dialogRef.close({
            update: false
        });
    }

    public async onAddClick(): Promise<void> {
        this.disabledButton = true;
        const formValue = this.formGroupObject.value;
        const accountObject: IAccount = {
            federation: formValue.federation,
            address: formValue.address,
            memoType: formValue.memoType
        };

        if (formValue.memo) {
            accountObject.memo = formValue.memo;
        }
        try {
            await this.accountsService.addAccount(accountObject);
            this.dialogRef.close({
                update: true
            });
        } catch (e) {
            if (e.error.error.type === 'WrongAddressError') {
                this.snackHelper.showSnack(`Field '${e.error.error.params.field}' is incorrect`, true, 10);
            } else {
                this.snackHelper.showSnack(e.message, true, 10);
                this.dialogRef.close({
                    update: false
                });
            }
        } finally {
            this.disabledButton = false;
        }
    }

    public onMemoTypeChange(change: MatSelectChange): void {
        if (change.value === MemoType.None) {
            this.memoControl.setValue(null);
            this.memoControl.clearValidators();
            this.memoControl.disable();
        } else {
            this.memoControl.enable();
            this.memoControl.setValidators(Validators.required);
        }
    }

    public ngOnInit(): void {
        this.formGroupObject = this.fb.group({
            federation: this.federationControl,
            address: this.addressControl,
            memoType: this.memoTypeControl,
            memo: this.memoControl
        });
        this.memoTypeControl.setValue(MemoType.None);
        this.memoControl.disable();
    }

    public ngOnDestroy(): void {
        this.disabledButton = true;
    }

}
