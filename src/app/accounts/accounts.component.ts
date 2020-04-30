import { Component, OnInit } from '@angular/core';
import { IAccount } from '../../interfaces/account.interface';
import { AccountsService } from '../services/accounts.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAccountDialogComponent } from '../add-account-dialog/add-account-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.styl']
})
export class AccountsComponent implements OnInit {
    public dataSource: IAccount[];
    public dialogProperties = {
        width: '40%',
        minWidth: '550px'
    };

    constructor(private accountsService: AccountsService,
                public dialog: MatDialog,
                public authService: AuthService) {
    }

    public async ngOnInit(): Promise<void> {
        this.dataSource = await this.accountsService.getAccounts();
    }

    public deleteHandler(federation: string): void {
        const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
            ...this.dialogProperties,
            data: {
                federation
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.update) {
                this.loadAccounts();
            }
        });
    }

    public openDialog(): void {
        const dialogRef = this.dialog.open(AddAccountDialogComponent, {
            width: '40%',
            minWidth: '550px'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.update) {
                this.loadAccounts();
            }
        });
    }

    public async loadAccounts(): Promise<void> {
        this.dataSource = await this.accountsService.getAccounts();
    }

    public get displayedColumns(): string[] {
        const columns = ['federation', 'address', 'memo', 'memo_type'];
        if (this.authService.isUserLoggedIn) {
            columns.push('action');
        }
        return columns;
    }

}
