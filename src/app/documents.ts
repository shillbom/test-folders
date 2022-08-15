export interface Document {
  id: number;
  parent: number;
  isFolder: boolean;
  name: string;
  lastChanged: Date;
  description: string;
}

export const Documents = [
  {
    id: 1,
    parent: 0,
    name: 'Panamabreven',
    isFolder: false,
    description: 'lite viktiga grejer',
    lastChanged: new Date('2016-04-03'),
  },
  {
    id: 2,
    parent: 0,
    name: 'Hello world',
    isFolder: false,
    description: 'asdf',
    lastChanged: new Date('1990-09-23'),
  },
  {
    id: 3,
    parent: 1,
    name: 'Hello world',
    isFolder: false,
    description: 'asdf',
    lastChanged: new Date('1990-09-23'),
  },
  {
    id: 4,
    parent: 1,
    name: 'Hello world',
    isFolder: false,
    description: 'asdf',
    lastChanged: new Date('1990-09-23'),
  },
  {
    id: 5,
    parent: 2,
    name: 'Hello world',
    isFolder: false,
    description: 'asdf',
    lastChanged: new Date('1990-09-23'),
  },
];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
