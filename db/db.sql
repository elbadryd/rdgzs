create schema roadTripMgr;

CREATE TABLE roadTripMgr.user (
	"id" serial NOT NULL,
	"username" serial(15) NOT NULL,
	"password" serial(60) NOT NULL,
	"email" serial(30) NOT NULL,
  "spotifyId" serial(50) NULL,
	CONSTRAINT User_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE roadTripMgr.trip (
	"id" serial NOT NULL,
	"userId" serial NOT NULL,
	"origin" serial(50) NOT NULL,
	"destination" serial(50) NOT NULL,
	"date" DATE(50) NOT NULL,
	CONSTRAINT Trip_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE roadTripMgr.trip (
	"id" serial NOT NULL,
	"tripId" serial NOT NULL,
	"placeID" varchar(60) NOT NULL,
	"name" varchar(40) NOT NULL,
	"description" varchar(140) NOT NULL,
	"link" varchar(140) NOT NULL,
	CONSTRAINT stop_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE roadTripMgr.photo (
	"id" serial NOT NULL,
	"tripId" integer NOT NULL,
	"latitude" integer NOT NULL,
	"longitude" integer NOT NULL,
	"link" varchar(200) NOT NULL,
	CONSTRAINT photo_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "Trip" ADD CONSTRAINT "Trip_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id");

ALTER TABLE "stop" ADD CONSTRAINT "stop_fk0" FOREIGN KEY ("tripId") REFERENCES "Trip"("id");

ALTER TABLE "photo" ADD CONSTRAINT "photo_fk0" FOREIGN KEY ("tripId") REFERENCES "Trip"("id");

