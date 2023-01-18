import { useQuery, useLazyQuery  } from '@apollo/client'
import { useState, useEffect } from 'react'

import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  
  const booksResult = useQuery(ALL_BOOKS)
  const [getBooksByGenre, genreResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: "no-cache",
  })

  const [genre, setGenre] = useState("all")
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks);
    }
  }, [booksResult.data])

  useEffect(() => {
    if (genreResult.data) {
      setBooks(genreResult.data.allBooks);
    }
  }, [genreResult.data]);


  if (!props.show || !books ) {
    return null
  }

  if (booksResult.loading || genreResult.loading ) {
    return <div>loading...</div>;
  }

  if (booksResult.error || genreResult.error) {
    return <div>Something went wrong</div>;
  }

  const { allBooks } = booksResult.data

  const genres = [...new Set(allBooks.flatMap((b) => b.genres))].concat("all")

  const handleGenreClick = (genre) => {
    setGenre(genre);

    if (genre === "all") {
      setBooks(allBooks);
      return;
    }

    getBooksByGenre({ variables: { genre: genre } });
  }

  return (
    <div>
      <h2>books</h2>
      <p>
        in genre <strong> {genre} </strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreClick(genre)}>
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Books
