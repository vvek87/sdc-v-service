# About The Author module from goodreads

>  The module will display author info of the book that is displayed. Specifically, this module will
    display the author's name, number of followers, and a biography. Also, the top 5 books of that
    author will display along with a pop-up window with detailed book information that displays
    if the user hovers over a particular book title.

## Related Projects

  - https://github.com/rpt12-knightrider/jb-service
  - https://github.com/rpt12-knightrider/s-service
  - https://github.com/rpt12-knightrider/mj-service
  - https://github.com/rpt12-knightrider/sm-service

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

### Initial Setup
Complete these two steps ONCE before starting the application for the first time:
1.  `npm install -g webpack` to install webpack globally.
1. `npm install` to install dependencies.
2. `npm run create-db` to create MySql database for the application.

### Regular Usage
To start the application, Please run the following "package.json" scripts:<br>
1. `npm run webpack` to start Webpack.<br>
2. `npm run start` to start the Node server.<br>
3. `npm run seed` to add fake data to the db.<br>

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 10.13.0
- etc

## Development

## API Endpoints

**URL:** /create<br>
**Description:** CREATE an author and a book associated with that author and inserts into db<br>
**API Response:** 200 or 500<br>

**URL:** /author/:id<br>
**Description:** Uses input id from url or 1 to READ an author and their associated books from the db <br>
**API Response:** 200 and an object with author/book info or 500<br>

**URL:** /update/:id<br>
**Description:** Grabs input id from url or 1 and generates a new author to UPDATE the existing author in db with that id<br>
**API Response:** 200 or 500<br>

**URL:** /delete/:id<br>
**Description:** Grabs input id from url or 1 and deletes an author and books from the db associated with that id<br>
**API Response:** 200 or 500<br>
```

# New Document