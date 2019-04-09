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
Complete the following step ONLY before starting the application for the first time:
1. Open MySql from the command line.
2. Run the following command:

```sh
CREATE DATABASE goodreads;
```

NOTE: This manual step of creating the db is a temporary workaround.

To start the application, Please run the following "package.json" scripts:<br>
1. `npm run webpack` to start Webpack.<br>
2. `npm run start` to start the Node server.<br>
3. `npm run migration` to create the needed tables in the db.<br>
4. `npm run seed` to add fake data to the db.<br>

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

## API Endpoints

**URL:** /author<br>
**Description:** This example retrieves an author's name, number of follwers, and a biography.<br>
**API Response:**<br>
```
{
  "name":"Rosalinda Kutch IV",
  "followers":91593,
  "biography":"Sunt sed vitae aliquid. Qui libero
  et explicabo maxime veritatis asperiores quia et
  mollitia. Dolor ipsam   laboriosam libero tempore."
}

```

**URL:** /five-books-by-author<br>
**Description:** This example retrives a maximum of five books written by an author.<br>
**API Response:**<br>
```
{
  "titles":
  [
    "Licensed Rubber Cheese",
  "Incredible Frozen Pants",
  "Handcrafted Wooden Bike",
  "Practical Steel Pizza",
  "Incredible Wooden Sausages"
  ]
}

```

**URL:** book-item-hover-window<br>
**Description:** This example retrieves a book's title, total number<br>
of ratings, the average rating, the year of publication, and a description of the book.<br>
**API Response:**<br>
```
{<br>
  "title":"Handcrafted Rubber Table",
  "total_ratings":18274,
  "average_ratings":"4",
  "year":2007,
  "description":"Eum hic dolorem. Illum omnis tenetur atque
  iusto non. Iste placeat et amet cupiditate quo."
}

```
