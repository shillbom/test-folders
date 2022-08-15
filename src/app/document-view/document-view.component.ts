import { Component, OnInit } from '@angular/core';

import { Documents } from '../documents';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit {
  documents = Documents;

  constructor() { }

  ngOnInit(): void {
  }

}
