/*
  Warnings:

  - You are about to drop the column `depth` on the `Boxes` table. All the data in the column will be lost.
  - Added the required column `width` to the `Boxes` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Boxes] DROP COLUMN [depth];
ALTER TABLE [dbo].[Boxes] ADD [width] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
