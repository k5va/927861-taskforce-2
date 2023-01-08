-- CreateTable
CREATE TABLE "TaskContractor" (
    "id" SERIAL NOT NULL,
    "contractor" TEXT NOT NULL,
    "failedTasksCount" INTEGER NOT NULL DEFAULT 0,
    "doneTasksCount" INTEGER NOT NULL DEFAULT 0,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "ratingSum" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TaskContractor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskContractor_contractor_key" ON "TaskContractor"("contractor");
