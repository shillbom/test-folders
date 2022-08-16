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
    name: 'Ett dokument',
    isFolder: false,
    description: 'asdf',
    lastChanged: new Date('1990-09-23'),
  },
  {
    id: 3,
    parent: 10,
    name: 'Hemliga recept',
    isFolder: false,
    description: 'Gotländska husmorsrecept',
    lastChanged: new Date('2022-09-23'),
  },
  {
    id: 4,
    parent: 10,
    name: 'Hemliga agenter',
    isFolder: false,
    description: 'bra lista',
    lastChanged: new Date('1990-09-23'),
  },
  {
    id: 5,
    parent: 11,
    name: 'Ställen i Göteborg',
    isFolder: false,
    description: '',
    lastChanged: new Date('2021-10-23'),
  },
  {
    id: 6,
    parent: 11,
    name: 'Ställen i Malmö',
    isFolder: false,
    description: '',
    lastChanged: new Date('2021-10-23'),
  },
  {
    id: 10,
    parent: 0,
    name: 'Hemligt',
    isFolder: true,
    description: 'Extra hemliga grejer',
    lastChanged: new Date('2016-04-03'),
  },
  {
    id: 11,
    parent: 0,
    name: 'Ej hemligt',
    isFolder: true,
    description: 'ställen att luncha på',
    lastChanged: new Date('1990-09-23'),
  },
  {
    id: 12,
    parent: 10,
    name: 'Tom mapp',
    isFolder: true,
    description: '',
    lastChanged: new Date('1990-09-23'),
  },
] as Document[];

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
