let theatres = [
  { theatreId: 1, name: "Regal Cinemas", location: "Downtown" },
  { theatreId: 2, name: "AMC Theatres", location: "Midtown" },
  { theatreId: 3, name: "Cinemark", location: "Uptown" },
];

let shows = [
  { showId: 1, title: "The Lion King", theatreId: 1, time: "7:00 PM" },
  { showId: 2, title: "Hamilton", theatreId: 2, time: "8:00 PM" },
  { showId: 3, title: "Wicked", theatreId: 3, time: "9:00 PM" },
  { showId: 4, title: "Les Misérables", theatreId: 1, time: "6:00 PM" },
];

function getAllShows() {
  return shows;
}

function getShowById(id) {
  return shows.find((show) => show.showId === id);
}

function addShow(show) {
  const errors = [];

  if (!show.title || typeof show.title !== "string") {
    errors.push("Title is required and should be a string.");
  }

  if (!show.theatreId || typeof show.theatreId !== "number") {
    errors.push("Theatre ID is required and should be a number.");
  }

  if (!show.time || typeof show.time !== "string") {
    errors.push("Time is required and should be a string.");
  }

  return errors.length > 0 ? errors : null;
}

module.exports = { shows, theatres, getAllShows, getShowById, addShow };
