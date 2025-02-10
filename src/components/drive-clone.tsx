"use client";

import type React from "react";
import { useState } from "react";
import {
  type File,
  type Folder,
  mockFiles,
  mockFolders,
} from "~/lib/mock-data";
import {
  FolderIcon,
  FileIcon,
  ChevronRightIcon,
  UploadIcon,
} from "lucide-react";
import { Button } from "~/components/ui/button";

const Breadcrumb: React.FC<{
  path: Folder[];
  onNavigate: (id: string) => void;
}> = ({ path, onNavigate }) => (
  <nav className="mb-4 flex" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-3">
      {path.map((folder, index) => (
        <li key={folder.id} className="inline-flex items-center">
          {index > 0 && <ChevronRightIcon className="h-4 w-4 text-gray-400" />}
          <button
            onClick={() => onNavigate(folder.id)}
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-blue-500"
          >
            {folder.name}
          </button>
        </li>
      ))}
    </ol>
  </nav>
);

const FileList: React.FC<{
  items: Array<File | Folder>;
  onNavigate: (id: string) => void;
}> = ({ items, onNavigate }) => (
  <div className="overflow-hidden rounded-lg bg-gray-800 shadow">
    <table className="min-w-full divide-y divide-gray-700">
      <thead className="bg-gray-900">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
          >
            Size
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-700">
        {items.map((item) => (
          <tr key={item.id} className="hover:bg-gray-700">
            <td className="whitespace-nowrap px-6 py-4">
              <div className="flex items-center">
                {item.type === "folder" ? (
                  <FolderIcon className="mr-2 h-5 w-5 text-yellow-500" />
                ) : (
                  <FileIcon className="mr-2 h-5 w-5 text-blue-500" />
                )}
                <button
                  onClick={() => item.type === "folder" && onNavigate(item.id)}
                  className="text-sm font-medium text-gray-300 hover:text-blue-500"
                >
                  {item.name}
                </button>
              </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
              {"size" in item ? item.size : "-"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function DriveClone() {
  const [currentFolder, setCurrentFolder] = useState<string>("root");
  const initialFolder =
    mockFolders.length > 0
      ? mockFolders[0]
      : {
          id: "root",
          name: "My Drive",
          type: "folder" as const,
          parent: null,
        };
  const [path, setPath] = useState<Folder[]>([initialFolder]);

  const navigateToFolder = (id: string) => {
    const folder = mockFolders.find((f) => f.id === id);
    if (folder) {
      setCurrentFolder(id);
      if (id === "root") {
        setPath([folder]);
      } else {
        const newPath = buildPath(folder);
        setPath(newPath);
      }
    }
  };

  const buildPath = (folder: Folder): Folder[] => {
    const path: Folder[] = [folder];
    let current = folder;
    while (current.parent) {
      const parent = mockFolders.find((f) => f.id === current.parent);
      if (parent) {
        path.unshift(parent);
        current = parent;
      } else break;
    }
    return path;
  };

  const getCurrentItems = (): Array<File | Folder> => {
    const folders = mockFolders.filter((f) => f.parent === currentFolder);
    const files = mockFiles.filter((f) => f.parent === currentFolder);
    return [...folders, ...files];
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold text-gray-100">
        Google Drive Clone
      </h1>
      <div className="mb-4 flex items-center justify-between">
        <Breadcrumb path={path} onNavigate={navigateToFolder} />
        <Button onClick={() => console.log("Upload")} variant="outline">
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>
      <FileList items={getCurrentItems()} onNavigate={navigateToFolder} />
    </div>
  );
}
