import { Component, OnInit, Input } from '@angular/core';

import DocumentService from '../services/document-service';
import { Document } from '../documents';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css'],
})
export class DocumentViewComponent implements OnInit {
  documents = [] as Document[];
  folders = DocumentService.GetFolders();
  currentFolder = 0;

  onFolderSelected(id: number) {
    this.currentFolder = id;
    this.refreshDocuments();
  }

  onDocumentSelected(id: number) {
    window.alert('ACCESS DENIED, doc id: ' + id);
  }

  addFolder() {
    let folderName = prompt('Enter folder name', 'new folder');

    if (folderName != null) {
      let desc = prompt('Description', '') || '';

      DocumentService.AddDocument(folderName, desc, true, this.currentFolder);
      this.refreshDocuments();
    }
  }

  addDocument() {
    let documentName = prompt('Enter document name', 'new document');

    if (documentName != null) {
      let desc = prompt('Description', '') || '';

      DocumentService.AddDocument(
        documentName,
        desc,
        false,
        this.currentFolder
      );
      this.refreshDocuments();
    }
  }

  onDocumentMoved(ev: any) {
    console.log(ev);
    DocumentService.MoveDocument(ev.from, ev.to);

    this.refreshDocuments();
  }

  refreshDocuments() {
    this.documents = DocumentService.GetDocuments(this.currentFolder);
    this.folders = DocumentService.GetFolders();
  }

  constructor() {}

  ngOnInit(): void {
    this.refreshDocuments();
  }
}
