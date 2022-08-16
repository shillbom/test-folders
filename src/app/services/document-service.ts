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
