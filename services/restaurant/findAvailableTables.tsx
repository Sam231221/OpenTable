import { PrismaClient, Table } from "@prisma/client";
import { NextApiResponse } from "next";
import { times } from "@/data/times";

const prisma = new PrismaClient();

export const findAvailabileTables = async ({
  time,
  day,
  res,
  restaurant,
}: {
  time: string;
  day: string;
  res: NextApiResponse;
  restaurant: {
    tables: Table[];
    open_time: string;
    close_time: string;
  };
}) => {
  //if time doesnt matches
  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({
      errorMessage: "Invalid time provided",
    });
  }
  //query possible available bookings with gte and lt
  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  //declare an bookintableobj and update tables field
  const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};
  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] =
      booking.tables.reduce((obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      }, {});
  });

  const tables = restaurant.tables;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) return false;
      }
      return true;
    });
  });

  // return res.json({ searchTimes, bookings, bookingTablesObj });
  return searchTimesWithTables;
  /*
  Output:
  [
  {
    number_of_people: 4,
    booking_time: 2023-06-01T22:30:29.000Z,
    tables: [ [Object] ]
  }
]
  */
};
