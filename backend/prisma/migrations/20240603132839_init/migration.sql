/*
  Warnings:

  - You are about to drop the column `length` on the `Boxes` table. All the data in the column will be lost.
  - Added the required column `depth` to the `Boxes` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Boxes] DROP COLUMN [length];
ALTER TABLE [dbo].[Boxes] ADD [depth] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
