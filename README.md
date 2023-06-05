# Authentication

Table and Booking Model has many to many relationship
.Since User can do a booking for one or more table. And,
One tabe can have different bookings by different individuals

# useAvailabilities hook

    -> A hook that determines whether a free tables are availabe or not over a period of time.
    Implemented in ReservationCard

# Availability.ts logic (when find a time btn is clicked).

->Find all searhc times
we have data/times.ts that show times 1 hr before and after.
->Find all the bookings that falls within that range of time
-compress into an object where datetime is key and an object of table ids is the value.

Get data from searchTimesWithTables from findAvailableTable.tsx file and then we can use it to check whether the booking
for table is available or not.
We use 'partySize' as user input. Compare this value with a value that is sum of 'seats' field of all tables

For example
const availabilities = searchTimesWithTables
.map((t) => {
const sumSeats = t.tables.reduce((sum, table) => {
return sum + table.seats;
}, 0);

        return {
          time: t.time,
          //returns boolean
          available: sumSeats >= parseInt(partySize),
        };
      })

if partySize is less than sum value
{
availabilty:true
}
else
{
availabilty:false
}
