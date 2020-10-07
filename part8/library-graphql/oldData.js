let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    setBornTo: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    setBornTo: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
/*   
mutation {
    addBook(
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"],
    ){
      title
author{
  name
}
    }
  } 

  mutation {
    addAuthor(
         name: "Robert Martin",
    born: 1952,
    ){
      name
    }
  } 

    mutation {
    editAuthor(
         name: "Robert Martin",
    setBornTo: 1952,
    ){
      name
      born
    }
  } 
  */
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon",
    published: 1872,
    author: "Fyodor Dostoevsky",
    genres: ["classic", "revolution"],
  },
/*   addBook(title:"authenticated",author:"author",published:2000){
    title
    author{
      name
    }
  } */
  /* 
{
  "Authorization":"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYSIsImlkIjoiNWY3Y2MwODgzODVlMmUzMGQ4NjYyNGU2IiwiaWF0IjoxNjAyMDEyNDQ4fQ.H_tvlx8oInfbyYuAhjo4WlgHDXt1NZkbxmcOYkYMKlc"
}
  */
]
