import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../documents';
import { CdkDragRelease, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {
  @Input() documents: Document[];

  @Output() folderSelected = new EventEmitter<number>();
  @Output() documentSelected = new EventEmitter<number>();

  drag(event: CdkDragRelease<any>) {
    console.log('drag', event.source);

    event.source._dragRef.reset();
  }

  drop(event: CdkDragDrop<any, any>) {
    console.log('drop', event);
  }

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
