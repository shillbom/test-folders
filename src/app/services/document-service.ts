import { Documents, Document } from '../documents';

class DocumentService {
  AddDocument(
    name: string,
    description: string,
    isFolder: boolean,
    parent: number
  ) {
    var doc = {
      id: this.GenerateId(),
      name: name,
      description: description,
      isFolder: isFolder,
      parent: parent,
      lastChanged: new Date(),
    } as Document;

    Documents.push(doc);
  }

  GetDocuments(folderId: number): Document[] {
    let docs = Documents.filter((d) => d.parent == folderId);

    // Add "up" folder if this isn't root
    if (folderId != 0) {
      let thisFolder = Documents.find((d) => d.id == folderId);
      const up = {
        name: '..',
        id: thisFolder!.parent,
        isFolder: true,
      } as Document;
      docs = [up, ...docs];
    }

    return docs;
  }

  GetFolders(): Folder {
    var root = {
      name: '..',
      id: 0,
      children: [],
    };

    this.AddSubFolders(root);

    return root;
  }

  private GenerateId(): number {
    let test = 0;
    let found = null;
    do {
      test = Math.floor(Math.random() * 10000);
      found = Documents.find((d) => d.id == test);
    } while (found != null);

    return test;
  }

  private AddSubFolders(folder: Folder) {
    for (const subFolder of Documents.filter(
      (d) => d.isFolder && d.parent == folder.id
    )) {
      var created = {
        name: subFolder.name,
        id: subFolder.id,
        children: [],
      } as Folder;
      this.AddSubFolders(created);

      folder.children.push(created);
    }
  }
}

export interface Folder {
  name: string;
  id: number;
  children: Folder[];
}

export default new DocumentService();
