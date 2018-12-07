
# PROJECT NAME

---

Name: Kishan Segu


Date: 12/6/2018

Project Topic: Songs Collection

URL:
https://song-collection-app.herokuapp.com/
---


### 1. Data Format and Storage

Data point fields:
- `Field 1`:     name       `Type: String`
- `Field 2`:     artists       `Type: [String]`
- `Field 3`:     year       `Type: Number`
- `Field 4`:     rating       `Type: Number`
- `Field 5`:     genre       `Type: String`

Schema:
```javascript
{
  name: {
      type: String,
      required: true,
  },
  artists: {
    type: [String],
    required: true
  },
  year: {
      type: Number,
      required: true
  },
  rating: {
      type: Number,
      required: true
  },
  genre: {
      type: String,
      required: true
  }
}
```

### 2. Add New Data

HTML form route: `/addSong`

POST endpoint route: `/api/addSong`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/addSong',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
       Name: 'Yarri Yeah',
       Artists: [Mickey Singh, Anjali World],
       Year: 2018,
       Rating: 6,
       Genre: 'Hip Hop'

    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/getSongs`

### 4. Search Data

Search Field: name

### 5. Navigation Pages

Navigation Filters
1. get Songs/home -> `/ `
2. R&B Songs -> `/songs/R&BSongs `
3. Songs from this Year -> ` /songs/thisYear  `
4. Songs before 1990 -> `  songs/oldSongs  `
5. songs with rating above 5 -> `  songs/topSongs  `
6. remove ->   ` /removeSong  `
