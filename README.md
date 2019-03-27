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

> Pleaes run the following "package.json" scripts to start the application;<br>
1. `npm run webpack` to start Webpack.<br>
2. `npm run start` to start the Node server.<br>
3. `npm run seed` to add fake data to the database.<br>

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

URL: /author
Description: This example retrieves an author's name, number of follwers, and a biography.
API Response:<br>
{<br>
  "name":"Rosalinda Kutch IV",<br>
  "followers":91593,<br>
  "biography":"Sunt sed vitae aliquid. Qui libero et explicabo maxime veritatis asperiores quia et mollitia. Dolor ipsam <br>laboriosam libero tempore."<br>
}<br>

URL: /five-books-by-author
Description: This example retrives a maximum of five books written by an author.
API Response:<br>
{<br>
  "titles":<br>
  [<br>
    "Licensed Rubber Cheese",<br>
  "Incredible Frozen Pants",<br>
  "Handcrafted Wooden Bike",<br>
  "Practical Steel Pizza",<br>
  "Incredible Wooden Sausages"<br>
  ]<br>
}<br>

URL: book-item-hover-window
Description: This example retrieves a book's title, total number of ratings, the average rating,
the year of publication, and a description of the book.
API Response:<br>
{<br>
  "title":"Handcrafted Rubber Table",<br>
  "total_ratings":18274,<br>
  "average_ratings":"4",<br>
  "year":2007,<br>
  "description":"Eum hic dolorem. Illum omnis tenetur atque iusto non. Iste placeat et amet cupiditate quo."<br>
}

