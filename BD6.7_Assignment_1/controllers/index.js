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
  if (!show.title || typeof show.title !== "string") {
    return "Title is required and should be a string.";
  }
  if (!show.theatreId || typeof show.theatreId !== "number") {
    return "Theatre ID is required and should be a number.";
  }
  if (!show.time || typeof show.time !== "string") {
    return "Time is required and should be a string.";
  }

  const newShowId = shows.length > 0 ? shows[shows.length - 1].showId + 1 : 1;
  const newShow = { showId: newShowId, ...show };
  shows.push(newShow);

  return newShow;
}

module.exports = { shows, theatres, getAllShows, getShowById, addShow };
