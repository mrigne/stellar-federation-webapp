import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SigninDialogComponent } from '../signin-dialog/signin-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-header-component',
    templateUrl: './header-component.component.html',
    styleUrls: ['./header-component.component.styl']
})
export class HeaderComponentComponent implements OnInit {
    public username;

    constructor(public router: Router,
                public dialog: MatDialog,
                public authService: AuthService) { }

    public ngOnInit(): void {
        if (this.authService.isUserLoggedIn) {
            this.authService.getCurrentUser().then(res => this.username = res.username);
        }
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(SigninDialogComponent, {
            width: '40%',
            minWidth: '550px'
        });
    }
}
