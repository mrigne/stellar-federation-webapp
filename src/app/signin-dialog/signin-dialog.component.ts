import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { SnackBarService } from '../services/snack-bar.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-signin-dialog',
    templateUrl: './signin-dialog.component.html',
    styleUrls: ['./signin-dialog.component.styl']
})
export class SigninDialogComponent implements OnInit {
    public formGroupObject: FormGroup;
    public usernameControl = new FormControl(null, Validators.required);
    public passwordControl = new FormControl(null, Validators.required);

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private snackbarService: SnackBarService,
                public dialogRef: MatDialogRef<SigninDialogComponent>) { }

    public ngOnInit(): void {
        this.formGroupObject = this.fb.group({
            username: this.usernameControl,
            password: this.passwordControl
        });
    }

    public async submit(): Promise<void> {
        const { username, password } = this.formGroupObject.value;
        try {
            await this.authService.signIn(username, password);
            this.dialogRef.close();
        }  catch (e) {
            if (e.error.error?.type === 'WrongCredentialsError') {
                this.snackbarService.showSnack('Wrong credentials. Try again.');
            }
        }
    }
}
