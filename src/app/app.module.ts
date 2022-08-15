import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentRowComponent } from './document-list/document-row/document-row.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CdkTreeModule } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{ path: '', component: DocumentViewComponent }]),
    BrowserAnimationsModule,
    CdkTreeModule,
    MatIconModule,
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    DocumentListComponent,
    DocumentRowComponent,
    DocumentViewComponent,
    TreeViewComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
