import DriveContents from "./drive-contents";
import { QUERIES } from "~/server/db/queries";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const paresedFolderId = parseInt(params.folderId);
  if (isNaN(paresedFolderId)) {
    throw new Error("Invalid folder id");
  }

  const [files, folders, parents] = await Promise.all([
    QUERIES.getFiles(paresedFolderId),
    QUERIES.getFolders(paresedFolderId),
    QUERIES.getAllParentsForFolder(paresedFolderId),
  ]);

  return (
    <DriveContents
      files={files}
      folders={folders}
      parents={parents}
      currentFolderId={paresedFolderId}
    />
  );
}
