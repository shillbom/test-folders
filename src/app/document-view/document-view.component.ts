import { Component, OnInit, Input } from '@angular/core';

import DocumentService from '../services/document-service';
import { Document } from '../documents';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css'],
})
export class DocumentViewComponent implements OnInit {
  folderId = 0;
  documents = [] as Document[];

  onFolderSelected(id: number) {
    debugger;
    this.folderId = id;
  }

  constructor() {}

  ngOnInit(): void {
    this.documents = DocumentService.GetDocuments(this.folderId);
  }
}
