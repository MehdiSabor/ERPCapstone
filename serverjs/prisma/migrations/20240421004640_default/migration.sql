-- CreateTable
CREATE TABLE "User" (
    "UserID" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "PasswordHash" TEXT NOT NULL,
    "IsManager" BOOLEAN NOT NULL DEFAULT false,
    "CanCreateQuote" BOOLEAN NOT NULL DEFAULT false,
    "CanReadQuote" BOOLEAN NOT NULL DEFAULT false,
    "CanUpdateQuote" BOOLEAN NOT NULL DEFAULT false,
    "CanDeleteQuote" BOOLEAN NOT NULL DEFAULT false,
    "CanManageDeliveryNote" BOOLEAN NOT NULL DEFAULT false,
    "CanProcessPayments" BOOLEAN NOT NULL DEFAULT false,
    "CanProcessReturns" BOOLEAN NOT NULL DEFAULT false,
    "CanManageArticles" BOOLEAN NOT NULL DEFAULT false,
    "CanManageClients" BOOLEAN NOT NULL DEFAULT false,
    "CanManageCommercials" BOOLEAN NOT NULL DEFAULT false,
    "CanManageFournisseurs" BOOLEAN NOT NULL DEFAULT false,
    "LastLoginDate" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
