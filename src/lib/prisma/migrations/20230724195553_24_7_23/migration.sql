/*
  Warnings:

  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WaitingList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_eventId_fkey";

-- DropForeignKey
ALTER TABLE "WaitingList" DROP CONSTRAINT "WaitingList_eventId_fkey";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "WaitingList";

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "dateTimes" JSONB NOT NULL,
    "location" JSONB NOT NULL,
    "isFree" BOOLEAN NOT NULL,
    "maxTickets" INTEGER,
    "ticketsSold" INTEGER,
    "ticketsRemaining" INTEGER,
    "prices" JSONB,
    "allowMultipleTickets" BOOLEAN,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookings" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "tickets" JSONB NOT NULL,
    "totalTickets" INTEGER NOT NULL,
    "contact" JSONB NOT NULL,
    "amountToPay" DOUBLE PRECISION NOT NULL,
    "hasPaid" BOOLEAN NOT NULL,
    "additionalInfo" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "adminNotes" TEXT NOT NULL,

    CONSTRAINT "Bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Waitlists" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "inquiryDate" TEXT NOT NULL,

    CONSTRAINT "Waitlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Bookings" ADD CONSTRAINT "Bookings_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Waitlists" ADD CONSTRAINT "Waitlists_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
