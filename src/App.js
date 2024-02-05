import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useState, useEffect } from 'react';
import MyNav from './components/MyNav'
import MyFooter from './components/MyFooter'
import Welcome from './components/Welcome'
import { Container } from 'react-bootstrap'
import BookList from './components/BookList'
import CommentArea from './components/CommentArea'

import fantasy from './data/fantasy.json'

function App() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (selectedBook) {
      fetch(`https://striveschool-api.herokuapp.com/api/comments/${selectedBook}`, {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWMxMDA3NGUwODVmYTAwMTk2MzFiMGYiLCJpYXQiOjE3MDcxNDczODAsImV4cCI6MTcwODM1Njk4MH0.CFTF16TBAudjXsJsS0aGMvJsikic6NCrimMLVllnFFk'
        }
      })
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => console.error(error));
    }
  }, [selectedBook]);

  return (
    <>
      <MyNav />
      <Container>
        <Welcome />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>
            <BookList books={fantasy} onBookSelect={setSelectedBook} />
          </div>
          <div style={{ flex: 1 }}>
            {selectedBook && <CommentArea book={selectedBook} comments={comments} />}
          </div>
        </div>
      </Container>
      <MyFooter />
    </>
  )
}

export default App