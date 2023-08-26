-- CreateTable
CREATE TABLE "Emails" (
    "id" SERIAL NOT NULL,
    "recipient" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Emails_pkey" PRIMARY KEY ("id")
);
