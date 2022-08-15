import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../../documents';
import { formatDate } from '@angular/common';

@Component({
  selector: '[app-document-row]',
  templateUrl: './document-row.component.html',
  styleUrls: ['./document-row.component.css'],
})
export class DocumentRowComponent implements OnInit {
  @Input() document!: Document;

  format(value: Date, format: string): string {
    return formatDate(value, format, 'en-GB');
  }

  constructor() {
    if (document === null) {
      throw new Error("Attribute 'document' is required");
    }
  }

  ngOnInit() {}
}
