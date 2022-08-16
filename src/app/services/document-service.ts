import { Documents, Document } from '../documents';

class DocumentService {
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
