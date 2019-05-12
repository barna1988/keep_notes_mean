import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../note';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit{

  @Input() note: Note;
  //@Output() showActionIcons = new EventEmitter<boolean>(); //TODO - check later - http://next.plnkr.co/edit/tXzr3XgTrgMWMVzAw8d7?p=preview

  constructor(private routeSvc: RouterService) { }

  ngOnInit() {
    //console.log('note card : ', this.note);
  }

  openNoteEditView() {
    const noteID = this.note.id;
    this.routeSvc.routeToEditNoteView(noteID);
  }

  toggleSelection() {
    this.note.checked = !this.note.checked;
    //console.log('checked : ', this.note.checked);
  }

  showActions() {
    // if(this.note.checked) {
    //   this.showActionIcons.emit(true);
    // }
  }

}
