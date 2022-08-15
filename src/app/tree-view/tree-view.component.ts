import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';

import DocumentService, { Folder } from '../services/document-service';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css'],
})
export class TreeViewComponent implements OnInit {
  treeControl = new NestedTreeControl<Folder>((node) => node.children);

  folder = DocumentService.GetFolders();
  dataSource = new ArrayDataSource([this.folder]);

  hasChild = (_: number, node: Folder) => node.children.length > 0;

  @Output() folderSelected = new EventEmitter<number>();

  onClick(clicked: Folder) {
    this.folderSelected.emit(clicked.id);
  }

  constructor() {}

  ngOnInit(): void {
    this.treeControl.expand(this.folder);
  }
}
