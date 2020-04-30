import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AccountsComponent } from './accounts/accounts.component';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomePageComponent,
    },
    {
        path: 'accounts',
        component: AccountsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
