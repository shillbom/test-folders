import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Document } from '../documents';
import { CdkDragStart, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

import DocumentService from '../services/document-service';

interface Folder {
  name: string;
  id: number;
  level: number;
  children: Folder[];
  document: Document;
}

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
})
export class TreeViewComponent implements OnInit {
  treeControl = new NestedTreeControl<Folder>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Folder>();

  @Input() folders: Document[] = [];
  @Input() selectedId: number;

  @Output() folderSelected = new EventEmitter<number>();
  @Output() documentMoved = new EventEmitter<any>();

  rootFolder = {
    name: '..',
    id: 0,
    level: 0,
    children: [],
    document: {
      id: 0,
      name: '',
      isFolder: true,
    },
  } as Folder;
  data = [this.rootFolder];

  onClick(clicked: Folder) {
    this.folderSelected.emit(clicked.id);
  }

  constructor(private renderer: Renderer2) {
    this.dataSource.data = this.data;
  }

  ngOnInit(): void {
    this.addSubFolders(this.rootFolder, 1);

    this.treeControl.expand(this.rootFolder);
  }

  getPadding(node: Folder): string {
    return `${22 * node.level}px`;
  }

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

  drop(event: any) {
    this.documentMoved.emit({
      from: event.item.data.id,
      to: event.container.data.id,
    });
  }

  ngOnChanges() {
    if (this.folders != null) {
      this.addSubFolders(this.rootFolder, 1);

      this.dataSource.data = null;
      this.dataSource.data = this.data;
    }
  }

  noReturnPredicate(drag: CdkDrag<any>, drop: CdkDropList<any>) {
    const doc = drag.data as Document;
    const to = drop.data as Document;
    return DocumentService.IsAllowedToMoveDocument(doc.id, to.id);
  }

  hasChild = (_: number, node: Folder) => node.children.length > 0;

  private addSubFolders(folder: Folder, level: number) {
    folder.children = [];
    for (const subFolder of this.folders.filter(
      (d) => d.isFolder && d.parent == folder.id
    )) {
      let child = folder.children.find((s) => s.id == subFolder.id);
      if (child == null) {
        child = {
          name: subFolder.name,
          id: subFolder.id,
          level: level,
          children: [],
          document: subFolder,
        } as Folder;

        // Add the folder to the list and expand the node for newly created folders
        folder.children.push(child);
        this.treeControl.expand(folder);
      }

      this.addSubFolders(child, level + 1);
    }
  }
}
