import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Document } from '../documents';
import {
  CdkDragRelease,
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDragStart,
} from '@angular/cdk/drag-drop';

import DocumentService from '../services/document-service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent {
  @Input() documents: Document[];

  @Output() folderSelected = new EventEmitter<number>();
  @Output() documentSelected = new EventEmitter<number>();
  @Output() documentMoved = new EventEmitter<any>();

  drop(event: any) {
    this.documentMoved.emit({
      from: event.item.data.id,
      to: event.container.data.id,
    });
  }

  // Maybe do some cool animations?
  exited(event: any) {}
  entered() {}

  // Manage temp icon for UX
  from = null as ElementRef | null;
  start(ev: CdkDragStart) {
    this.from = ev.source.dropContainer.element;

    if (this.from != null) {
      this.renderer.addClass(this.from.nativeElement, 'drag-from');
    }
  }
  stop(ev: any) {
    if (this.from != null) {
      this.renderer.removeClass(this.from.nativeElement, 'drag-from');
    }
    this.from = null;
  }

  selected(doc: Document) {
    if (doc.isFolder) {
      this.folderSelected.emit(doc.id);
    } else {
      this.documentSelected.emit(doc.id);
    }
  }

  noReturnPredicate(drag: CdkDrag<any>, drop: CdkDropList<any>) {
    const doc = drag.data as Document;
    const to = drop.data as Document;
    return DocumentService.IsAllowedToMoveDocument(doc.id, to.id);
  }

  constructor(private renderer: Renderer2) {
    this.documents = [];
  }
}
