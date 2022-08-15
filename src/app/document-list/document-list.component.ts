import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../documents';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {
  @Input() documents: Document[];

  @Output() folderSelected = new EventEmitter<number>();
  @Output() documentSelected = new EventEmitter<number>();

  selected(doc: Document) {
    if (doc.isFolder) {
      this.folderSelected.emit(doc.id);
    } else {
      this.documentSelected.emit(doc.id);
    }
  }

  constructor() {
    this.documents = [];
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
