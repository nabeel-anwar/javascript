'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const rows = flights.split('+');

for (const row of rows) {
  const [type, from, to, time] = row.split(';');
  const output = `${type.startsWith('_Delayed') ? '🛑' : ''} ${type.replaceAll('_', ' ')} From ${from.slice(0, 3).toUpperCase()} To ${to.slice(0, 3).toUpperCase()} (${time.replace(':', 'h')})`;

  console.log(output.padStart(50, ' '));
}
