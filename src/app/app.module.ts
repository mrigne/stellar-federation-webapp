import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponentComponent } from './header-component/header-component.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HomePageComponent } from './home-page/home-page.component';
import { AccountsComponent } from './accounts/accounts.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AccountsService } from './services/accounts.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AddAccountDialogComponent } from './add-account-dialog/add-account-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SnackBarComponent } from './snack-bar-component/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CookieService } from 'ngx-cookie-service';
import { SigninDialogComponent } from './signin-dialog/signin-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponentComponent,
        HomePageComponent,
        AccountsComponent,
        AddAccountDialogComponent,
        SnackBarComponent,
        ConfirmDeleteDialogComponent,
        SigninDialogComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonToggleModule,
        HttpClientModule,
        MatTableModule,
        MatMenuModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        MatSelectModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    providers: [CookieService],
    bootstrap: [AppComponent]
})
export class AppModule { }
