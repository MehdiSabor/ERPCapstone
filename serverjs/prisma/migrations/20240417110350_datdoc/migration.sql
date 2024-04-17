-- AlterTable
CREATE SEQUENCE famille_code_fam_seq;
ALTER TABLE "famille" ALTER COLUMN "code_fam" SET DEFAULT nextval('famille_code_fam_seq');
ALTER SEQUENCE famille_code_fam_seq OWNED BY "famille"."code_fam";
