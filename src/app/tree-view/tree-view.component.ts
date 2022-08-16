import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { Document } from '../documents';

interface Folder {
  name: string;
  id: number;
  children: Folder[];
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
  @Output() folderSelected = new EventEmitter<number>();

  rootFolder = {
    name: '..',
    id: 0,
    children: [],
  } as Folder;
  data = [this.rootFolder];

  onClick(clicked: Folder) {
    this.folderSelected.emit(clicked.id);
  }

  constructor() {
    this.dataSource.data = this.data;
  }

  ngOnInit(): void {
    this.addSubFolders(this.rootFolder);
    this.treeControl.expand(this.rootFolder);
  }

  ngOnChanges() {
    if (this.folders != null) {
      this.addSubFolders(this.rootFolder);

      this.dataSource.data = null;
      this.dataSource.data = this.data;
    }
  }

  hasChild = (_: number, node: Folder) => node.children.length > 0;

  private addSubFolders(folder: Folder) {
    for (const subFolder of this.folders.filter(
      (d) => d.isFolder && d.parent == folder.id
    )) {
      let child = folder.children.find((s) => s.id == subFolder.id);
      if (child == null) {
        child = {
          name: subFolder.name,
          id: subFolder.id,
          children: [],
        } as Folder;

        folder.children.push(child);
      }

      this.addSubFolders(child);
    }
  }
}
