import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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
  dataSource = new ArrayDataSource([] as Folder[]);

  hasChild = (_: number, node: Folder) => node.children.length > 0;

  @Input() folder!: Folder;
  @Output() folderSelected = new EventEmitter<number>();

  onClick(clicked: Folder) {
    this.folderSelected.emit(clicked.id);
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.dataSource = new ArrayDataSource([this.folder]);
    this.treeControl.expand(this.folder);
  }
}
