# Backend Task With Express Typescript

> A node js (typescript preferred) application with ExpressJS

<br />

## Task:

1. Add an author (name)
2. Add book under an author (name, publication year, type)
3. Get an author with all it’s books (books sorted by publication year)
4. Get list of authors with all their books, implement paging as well
5. Update an author
6. Update an book

<br />

## All Endpoints

| Endpoint                            | Functionality                           |
| ----------------------------------- | --------------------------------------- |
| GET `/author/single` (protected)    | Get single author with all it’s books   |
| GET `/author/list` (public)         | Get all the author with all their books |
| POST `/author/add` (public)         | Add a new author                        |
| PUT `/author/update` (protected)    | Update a particular author              |
| POST `/books/add` (protected)       | Add a book                              |
| PUT `/books/update/:id` (protected) | Update a particular book                |

<br />

## License Used

- MIT License
