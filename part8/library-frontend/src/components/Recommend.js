import { useQuery } from "@apollo/client"
import { ALL_BOOKS, USER } from "../queries"

const Recommend = (props) => {
    const user = useQuery(USER)
    const books = useQuery(ALL_BOOKS)

    if (!props.show || !books.data || !user.data ) {
        return null
    }

    if (user.loading || books.loading ) {
        return <div>loading...</div>;
    }

    if (user.error || books.error) {
        return <div>Something went wrong</div>;
    }

    const favoriteGenre = user.data.me.favoriteGenre

    const bookRecommendations = books.data.allBooks.filter((b) => b.genres.includes(favoriteGenre))

    return (
        <div>
          <h2>recommendations</h2>
          {bookRecommendations.length > 0 ? (
                <div>
                    <p>
                        books in your favourite genre <strong> {favoriteGenre} </strong>
                    </p>
                    <table>
                        <tbody>
                        <tr>
                            <th></th>
                            <th>author</th>
                            <th>published</th>
                        </tr>
                        {bookRecommendations.map((a) => (
                            <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>
                  No books have been added yet based on your favorite genre{" "}
                  <strong>{favoriteGenre}</strong>
                </p>
              )}
        </div>
      )
}

export default Recommend