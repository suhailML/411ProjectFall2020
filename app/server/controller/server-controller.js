// Import database
const knex = require('./../db');
const axios = require('axios');

// Retrieve all books

console.log("IN THE SERVER CONT");

exports.authorize = async (req, res) => {
  var data;
  let today = new Date();
  axios.get("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + req.params.tokenid)
    .then(authdata => {
      // console.log(authdata.data)
      // console.log(today.toLocaleDateString())
      //rudimentary token check i believe
      if (authdata.data.email_verified === "true" && today.toLocaleDateString() < authdata.data.exp){
         data = authdata.data
      } else {
        throw("not good token")
      }
      })
    .then(() => {
      const { email } = data
      knex('userInfo')
          .where('email', email)
          .then(info => res.json({
            info: info,
            firstName: data.given_name,
            lastName: data.family_name,
            email: email
          }))
          .catch(err => {
            res.json({message: `Error ${err} for getting userInfo`})
        })
    })
    .catch(e => console.log(e))
}

exports.tableSpecificSearch = async (req, res) => {
// Get all books from database
knex
  .select('*') // select all records
  .where(req.body.column, req.body.value)
  .from(req.body.table) // from 'books' table
  .then(userData => {
    // Send books extracted from database in response
    res.json(userData);
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error retrieving genres: ${err}` });
  });
}

exports.userSpecificSearch = async (req, res) => {
  // Get all books from database
  knex.select('*') // select all records
    .from('userInfo') // from 'userInfo' table
    .where('id'," LIKE" , `${req.body.query}%`)
    .orWhere('firstName', 'LIKE', `%${req.body.query}%`)
    .orWhere('lastName', 'LIKE', `%${req.body.query}%`)
    .orWhere('userName', 'LIKE', `%${req.body.query}%`)
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData);
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving genres: ${err}` });
    });
  }
  
  exports.getAnyAll = async (req, res) => {
    // Get all books from database
    knex
      .select('*') // select all records
      .from(req.body.table) // from 'books' table
      .then(userData => {
        // Send books extracted from database in response
        res.json(userData);
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving genres: ${err}` });
      });
    }
  
// recentlyWatched

exports.rwAll = async (req, res) => {
  // Get all books from database
  knex
    .select('*') // select all records
    .from('recentlyWatched') // from 'books' table
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData);
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving genres: ${err}` });
    });
}

// Create new book
exports.rwCreate = async (req, res) => {
  // Add new book to database
  knex('recentlyWatched')
    .insert({ // insert new record, a book    
      'movieTitle': req.body.movieTitle,
      'movieID': req.body.movieID,
      'userID': req.body.userID,
      'location': req.body.location,
      'date': req.body.date,
      'time': req.body.time
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `User ${req.body.genreName} created.` });
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.movieTitle}: ${err}` });
    });
}

exports.rwDelete = async (req, res) => {
  // Find specific book in the database and remove it
  knex('recentlyWatched')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Event ${req.body.id} deleted.` });
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` });
    });
}

// Remove all books on the list
exports.rwReset = async (req, res) => {
  // Remove all books from database
  knex
    .select('*') // select all records
    .from('recentlyWatched') // from 'books' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Events list cleared.' });
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting Event list: ${err}.` });
    });
}

// movies

exports.movieAll = async (req, res) => {
// Get all books from database
knex
  .select('*') // select all records
  .from('movies') // from 'books' table
  .then(userData => {
    // Send books extracted from database in response
    res.json(userData);
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error retrieving genres: ${err}` });
  });
}
// Create new book
exports.movieCreate = async (req, res) => {
// Add new book to database
knex('movies')
  .insert({ // insert new record, a book    
    'movidAPIid': req.body.movidAPIid,
    'movieTitle': req.body.movieTitle,
    'genreID': req.body.genreID,
    'poster_url': req.body.poster_url,
    'IMBDscore': req.body.IMBDscore,
  })
  .then(() => {
    // Send a success message in response
    res.json({ message: `User ${req.body.genreName} created.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error creating ${req.body.movieTitle}: ${err}` })
  })
}

exports.movieDelete = async (req, res) => {
// Find specific book in the database and remove it
knex('movies')
  .where('id', req.body.id) // find correct record based on id
  .del() // delete the record
  .then(() => {
    // Send a success message in response
    res.json({ message: `Event ${req.body.id} deleted.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
  })
}

// Remove all books on the list
exports.movieReset = async (req, res) => {
// Remove all books from database
knex
  .select('*') // select all records
  .from('movies') // from 'books' table
  .truncate() // remove the selection
  .then(() => {
    // Send a success message in response
    res.json({ message: 'Events list cleared.' })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error resetting Event list: ${err}.` })
  })
}



// genre

exports.genreAll = async (req, res) => {
// Get all books from database
knex
  .select('*') // select all records
  .from('genres') // from 'books' table
  .then(userData => {
    // Send books extracted from database in response
    res.json(userData)
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error retrieving genres: ${err}` })
  })
}
// Create new book
exports.genreCreate = async (req, res) => {
// Add new book to database
knex('genres')
  .insert({ // insert new record, a book
    'genreID': req.body.genre,
    'genreName': req.body.genreName,
  })
  .then(() => {
    // Send a success message in response
    res.json({ message: `User ${req.body.genreName} created.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error creating ${req.body.genreName}: ${err}` })
  })
}

exports.genreDelete = async (req, res) => {
// Find specific book in the database and remove it
knex('genre')
  .where('id', req.body.id) // find correct record based on id
  .del() // delete the record
  .then(() => {
    // Send a success message in response
    res.json({ message: `Event ${req.body.id} deleted.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
  })
}

// Remove all books on the list
exports.genreReset = async (req, res) => {
// Remove all books from database
knex
  .select('*') // select all records
  .from('genre') // from 'books' table
  .truncate() // remove the selection
  .then(() => {
    // Send a success message in response
    res.json({ message: 'Events list cleared.' })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error resetting Event list: ${err}.` })
  })
}





// -------- USER -----------

exports.usersAll = async (req, res) => {
  // Get all books from database
  knex
    .select('*') // select all records
    .from('userInfo') // from 'books' table
    .then(userData => {
      // Send books extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving books: ${err}` })
    })
  }

exports.getUser = async (req, res) => {
  // Get specific user from database
  knex
    .select('*') // select all records
    .from('userInfo') // from 'userInfo' table
    .where('email', email)
    .then(userData => {
      // Send specified userInfo based on userId extracted from database in response
      res.json(req);
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error getiing specific user: ${err}` })
    })
}

exports.searchUsers = async (req, res) => {
  // Get specific user from database
knex
  .select('*') // select all records
  .from('userInfo') // from 'userInfo' table
  .where('id', req.body.query)
  .orWhere('firstName', 'LIKE', `%${req.body.query}%`)
  .orWhere('lastName', 'LIKE', `%${req.body.query}%`)
  .orWhere('userName', 'LIKE', `%${req.body.query}%`)
  // find correct record based on id
  .then(userData => {
    // Send specified userInfo based on userId extracted from database in response
    res.json(userData)
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error getting search users: ${err}` })
  })
}


// //get single user
// exports.getUser = async (req, res) => {
//   knex('userInfo')
//     .where('id', req.params.userId)
//     .then(info => res.json(info))
//     .catch(err => {
//       res.json({message: `Error ${err} for getting userInfo`})
//     })
// }

// Create new book
exports.usersCreate = async (req, res) => {
// Add new book to database
knex('userInfo')
  .insert({ // insert new record, a user
    'firstName': req.body.firstName,
    'lastName': req.body.lastName,
    'email': req.body.email,
    'userName': req.body.userName,
    'locality': req.body.locality,
    'year': req.body.year,
    'clubAffiliations':req.body.clubAffiliations,
    'watchedMovies': req.body.watchedMovies
  })
  .returning('id')
  .then((id) => {
    // Send a success message in response
    res.json({ id: id, message: `User ${req.body.firstName} created.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error creating ${req.body.firstName}: ${err}` })
  })
}

exports.usersDelete = async (req, res) => {
// Find specific book in the database and remove it
knex
  .where('id', req.body.id) // find correct record based on id
  .del() // delete the record
  .then(() => {
    // Send a success message in response
    res.json({ message: `Event ${req.body.id} deleted.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
  })
}

// Remove all books on the list
exports.usersReset = async (req, res) => {
// Remove all books from database
knex
  .select('*') // select all records
  .from('userInfo') // from 'books' table
  .truncate() // remove the selection
  .then(() => {
    // Send a success message in response
    res.json({ message: 'Events list cleared.' })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error resetting Event list: ${err}.` })
  })
}







// --------- friends ------------

exports.friendAll = async (req, res) => {
  // Get all books from database
  knex
    .select('friendId') // select all records
    .from({u:'userInfo'}) // from 'userInfo' table
    .innerJoin({f:'friendList'}, 'f.friendId', '=', 'u.userId')
    .where('f.friendId',req.body.userID)
    .then(userData => {
      // Send friends extracted from database in response
      console.log(userData);
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retreving friends list: ${err}` })
    })
}

// add friend
exports.friendCreate = async (req, res) => {
  // Add new book to database
  knex('friendList')
    .insert({ // insert new record, a book
      'userId': req.body.userID,
      'friendId': req.body.friendID,
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `User ${req.body.userID} added ${req.body.friendID} as friend.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error adding friend ${req.body.friendID}: ${err}` })
    })
}

exports.friendDelete = async (req, res) => {
  // Find specific friend link in the database and remove it
  knex('friendList')
    .where(req.body.userID,req.body.friendID ) // find correct record based on ids
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `User ${req.body.userID} removed ${req.body.friendID} as friend.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error removing friend ${req.body.friendID}: ${err}` })
    })
}


// --------- watchlist ------------
exports.watchAll = async (req, res) => {
  // Get all wathced by user from database
  knex
    .select('userId') // select all records
    .from({u:'userInfo'}) // from 'userInfo' table
    .innerJoin({m:'watchList'}, 'm.movieID', '=', 'u.userId')
    .where('m.movieID',req.body.userID)
    .then(userData => {
      // Send watched movieID extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retreving watch list: ${err}` })
    })
}
// add friend
exports.watchCreate = async (req, res) => {
  // Add new book to database
  knex('watchList')
    .insert({ // insert new record, a book
      'userId': req.body.userID,
      'movieID': req.body.movieID,
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `User \'${req.body.userID}\' added \'${req.body.movieID}\' to watched movies.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error adding movie ${req.body.movieID}: ${err}` })
    })
}
exports.watchDelete = async (req, res) => {
  // Find specific friend link in the database and remove it
  knex('watchList')
    .where(req.body.userID,req.body.movieID ) // find correct record based on ids
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `User ${req.body.userID} removed ${req.body.movieID} from watchlist` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error removing friend ${req.body.friendID}: ${err}` })
    })
}









// events !!!!!!!!!!

exports.eventsAll = async (req, res) => {
// Get all events from database
knex
  .select('*') // select all records
  .from('events') // from 'books' table
  .then(userData => {
    // Send books extracted from database in response
    res.json(userData);
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error retrieving event: ${err}` })
  })
}


// Create new event
exports.eventsCreate = async (req, res) => {
// Add new book to database
knex("events")
  .insert({ // insert new record, a book
    'club_name': req.body.clubName,
    'mediaTitle': req.body.mediaTitle,
    'mediaID': req.body.mediaID,
    'date': req.body.date,
    'time': req.body.time,
    'eventDescription':req.body.eventDescription
  })
  .then(() => {
    // Send a success message in response
    res.json({ message: `Event by ${req.body.clubName} created.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error creating ${req.body.clubName} event: ${err}` })
  })
}

exports.eventsDelete = async (req, res) => {
// Find specific book in the database and remove it
knex('events')
  .where('id', req.body.id) // find correct record based on id
  .del() // delete the record
  .then(() => {
    // Send a success message in response
    res.json({ message: `Event ${req.body.id} deleted.` })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error deleting ${req.body.id} book: ${err}` })
  })
}

// Remove all events on the list
exports.eventsReset = async (req, res) => {
// Remove all books from database
knex
  .select('*') // select all records
  .from('events') // from 'books' table
  .truncate() // remove the selection
  .then(() => {
    // Send a success message in response
    res.json({ message: 'Events list cleared.' })
  })
  .catch(err => {
    // Send a error message in response
    res.json({ message: `There was an error resetting Event list: ${err}.` })
  })
}








//----------- trending in West ------------

exports.trendingWestAll = (req, res) => {
  console.log(req);  // Get all events from database
  knex
    .select('*') // select all records
    .from("trendingWest")
    .then(trendingData => {
      // Send books extracted from database in response     
      console.log(trendingData)
      res.json(trendingData);
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving event: ${err}` })
    })
  }


exports.trendingWestCreate = async (req, res) => {
  knex("trendingWest")
    .insert({
      'id': req.body.id,
      'title': req.body.title,
      'type': req.body.type,
      'backdrop_path': req.body.backdrop_path,
      'poster_path': req.body.poster_path,
      'release_date': req.body.release_date,
      'num_seasons': req.body.num_seasons,
      'num_episodes': req.body.num_episodes,
      'overview': req.body.overview,
      'num_views': 1
    })
    .onConflict('id')
    .merge({
      num_views: 4
    })
    .then(trendingWest => {
      // Send books extracted from database in response
      res.json(trendingWest)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving events: ${err}` })
    })
}






//----------- trending in East ------------

exports.trendingEastAll = async (req, res) => {
  // Get all events from database
  knex
    .select('*') // select all records
    .from('trendingEast') // from 'books' table
    .then(results => {
        console.log(results);
        res.json(results);
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving events: ${err}` })
    })
  }

  
exports.trendingEastCreate = async (req, res) => {
  knex.raw()
  knex("trendingEast")
    .insert({
      'id': req.body.id,
      'title': req.body.title,
      'type': req.body.type,
      'backdrop_path': req.body.backdrop_path,
      'poster_path': req.body.poster_path,
      'release_date': req.body.release_date,
      'num_seasons': req.body.num_seasons,
      'num_episodes': req.body.num_episodes,
      'overview': req.body.overview,
      'num_views': 1
    })
    .onConflict('id')
    .merge({
      num_views: 4
    })
    .then(trendingEast => {
      // Send books extracted from database in response
      res.json(trendingEast)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving events: ${err}` })
    })
}

//----------- trending in South ------------

exports.trendingSouthAll = async (req, res) => {
  // Get all events from database
  knex
    .select('*') // select all records
    .from('trendingSouth') // from 'books' table
    .then(trendingSouth => {
      // Send books extracted from database in response
      res.json(trendingSouth)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving events: ${err}` })
    })
  }

  
exports.trendingSouthCreate = async (req, res) => {
  knex.raw()
  knex("trendingSouth")
    .insert({
      'id': req.body.id,
      'title': req.body.title,
      'type': req.body.type,
      'backdrop_path': req.body.backdrop_path,
      'poster_path': req.body.poster_path,
      'release_date': req.body.release_date,
      'num_seasons': req.body.num_seasons,
      'num_episodes': req.body.num_episodes,
      'overview': req.body.overview,
      'num_views': 1
    })
    .onConflict('id')
    .merge({
      num_views: 4
    })
    .then(trendingSouth => {
      // Send books extracted from database in response
      res.json(trendingSouth)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving events: ${err}` })
    })
}




