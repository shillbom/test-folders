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

  IsAllowedToMoveDocument(doc: number, to: number): boolean {
    const found = Documents.find((d) => d.id == doc);
    if (doc == to) {
      return false;
    }

    if (found.parent == to) {
      return false;
    }

    if (found == null) {
      return false;
    }

    var toFolder = Documents.find((d) => d.id == to);
    if (toFolder == null) {
      return false;
    }

    if (!toFolder.isFolder) {
      return false;
    }

    if (found.isFolder && this.CheckIfParent(toFolder, doc)) {
      return false;
    }

    return true;
  }

  MoveDocument(doc: number, to: number) {
    if (this.IsAllowedToMoveDocument(doc, to)) {
      const found = Documents.find((d) => d.id == doc);
      found.parent = to;
    }
  }

  private CheckIfParent(folder: Document, parent: number): boolean {
    if (folder.id == 0 || folder.parent == 0) {
      return false;
    }

    if (folder.parent == parent) {
      return true;
    }

    var next = Documents.find((d) => d.id == folder.parent);
    return this.CheckIfParent(next, parent);
  }

  GetFolders(): Document[] {
    return Documents.filter((d) => d.isFolder);
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
}
export default new DocumentService();
