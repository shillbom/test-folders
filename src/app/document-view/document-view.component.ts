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

  onFolderSelected(id: number) {
    this.documents = DocumentService.GetDocuments(id);
  }

  onDocumentSelected(id: number) {
    window.alert('ACCESS DENIED, doc id: ' + id);
  }

  constructor() {}

  ngOnInit(): void {
    this.documents = DocumentService.GetDocuments(0);
  }
}
