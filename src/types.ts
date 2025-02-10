export interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  size?: string;
  modified: string;
}

export interface Folder {
  id: string;
  name: string;
  items: FileItem[];
}

export const mockData: Folder = {
  id: "root",
  name: "My Drive",
  items: [
    { id: "1", name: "Documents", type: "folder", modified: "2023-05-15" },
    { id: "2", name: "Images", type: "folder", modified: "2023-05-14" },
    {
      id: "3",
      name: "Project Proposal.pptx",
      type: "file",
      size: "2.5 MB",
      modified: "2023-05-13",
    },
    {
      id: "4",
      name: "Budget.xlsx",
      type: "file",
      size: "1.8 MB",
      modified: "2023-05-12",
    },
    {
      id: "5",
      name: "Meeting Notes.docx",
      type: "file",
      size: "500 KB",
      modified: "2023-05-11",
    },
  ],
};

export const folderStructure: Record<string, Folder> = {
  root: mockData,
  "1": {
    id: "1",
    name: "Documents",
    items: [
      {
        id: "6",
        name: "Resume.pdf",
        type: "file",
        size: "1.2 MB",
        modified: "2023-05-10",
      },
      {
        id: "7",
        name: "Cover Letter.docx",
        type: "file",
        size: "800 KB",
        modified: "2023-05-09",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Images",
    items: [
      {
        id: "8",
        name: "Profile Picture.jpg",
        type: "file",
        size: "3.5 MB",
        modified: "2023-05-08",
      },
      {
        id: "9",
        name: "Vacation Photos",
        type: "folder",
        modified: "2023-05-07",
      },
    ],
  },
  "9": {
    id: "9",
    name: "Vacation Photos",
    items: [
      {
        id: "10",
        name: "Beach.jpg",
        type: "file",
        size: "4.2 MB",
        modified: "2023-05-06",
      },
      {
        id: "11",
        name: "Mountains.jpg",
        type: "file",
        size: "3.8 MB",
        modified: "2023-05-05",
      },
    ],
  },
};
