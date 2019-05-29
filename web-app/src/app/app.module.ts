import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { GroupViewComponent } from './group-view/group-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { AuthenticationService } from './services/authentication.service';
import { NotesService } from './services/notes.service';
import { RouterService } from './services/router.service';
import { SocketService } from './services/socket.service';
import { ReminderService } from './services/reminder.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { NoteComponent } from './note/note.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { LoginComponent } from './login/login.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { NoteActionsComponent } from './note-actions/note-actions.component';
import { NoteSelectUserOpenerComponent } from './note-select-user-opener/note-select-user-opener.component';
import { NoteSelectUserViewComponent } from './note-select-user-view/note-select-user-view.component';
import { SearchNoteComponent } from './search-note/search-note.component';
import { NotificationComponent } from './notification/notification.component';
import { ReminderOpenerComponent } from './reminder-opener/reminder-opener.component';
import { ReminderViewComponent } from './reminder-view/reminder-view.component';
import { MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    NoteViewComponent,
    ListViewComponent,
    GroupViewComponent,
    EditNoteOpenerComponent,
    NoteComponent,
    NoteTakerComponent,
    LoginComponent,
    EditNoteViewComponent,
    LogoutComponent,
    RegisterComponent,
    NoteActionsComponent,
    NoteSelectUserOpenerComponent,
    NoteSelectUserViewComponent,
    SearchNoteComponent,
    NotificationComponent,
    ReminderOpenerComponent,
    ReminderViewComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule
  ],
  providers: [
    AuthenticationService,
    NotesService,
    RouterService,
    SocketService,
    ReminderService,
    CanActivateRouteGuard,
    MatDatepickerModule
    
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditNoteViewComponent,
    NoteSelectUserViewComponent,
    ReminderViewComponent
  ]
})
export class AppModule { }
