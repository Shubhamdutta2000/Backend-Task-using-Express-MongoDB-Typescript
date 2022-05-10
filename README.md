# Backend Tasks

> 1. A node js (typescript preferred) application with ExpressJS
> 2. Create a program (any language) that implements two functions, addScore and getAverage

<br />

## Task 1:

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

---

<br />

## Task 2:

- ***Problem***

```
Create a program (any language) that implements two functions
    1. addScore(score)
        a. Add score to the list
    2. getAverage() returns avg
        a. Gives the avg, logic to calculate avg is as follows
        b. If number of scores is 0 then return null/undefined
        c. If number of scores <= 2 then return avg of all
        d. If number of score > 2 then return avg excluding min and max
```

- **_Solution_**
  - https://github.com/Shubhamdutta2000/Backend_task_with_Express_Typescript/blob/main/Task_2.js

<br />

## License Used

- MIT License
