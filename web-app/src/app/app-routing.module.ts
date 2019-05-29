import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { NoteSelectUserOpenerComponent } from './note-select-user-opener/note-select-user-opener.component';
import { ReminderOpenerComponent } from './reminder-opener/reminder-opener.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [CanActivateRouteGuard],
        children: [
            {
                path: '',
                redirectTo: 'view/noteview',
                pathMatch: 'full'
            },
            {
                path: 'view/noteview',
                component: NoteViewComponent
            },
            {
                path: 'view/listview',
                component: ListViewComponent
            },
            {
                path: 'view/groupview',
                component: GroupViewComponent
            },
            {
                path: 'note/:noteId/edit',
                component: EditNoteOpenerComponent,
                outlet: 'noteEditOutlet'
            },
            {
                path: 'note/:action/users',
                component : NoteSelectUserOpenerComponent,
                outlet: 'noteUserOutlet'
            },
            {
                path: 'note/:noteId/remind',
                component : ReminderOpenerComponent,
                outlet: 'noteReminderOutlet'
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
