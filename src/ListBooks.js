import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends Component {

	// 监听select
	handleChange(value, key, item) {
		if(this.props.onChangeSelect){
			this.props.onChangeSelect(value, key, item)
		}
	}
	render() {

		const { books } = this.props

		return (
		  <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
           	  	{Object.keys(books).map((key) => (
	           	  	<div className="bookshelf" key={key}>
	                  <h2 className="bookshelf-title">{key === 'currentlyReading' ? 'Currently Reading' : key === 'wantToRead' ? 'Want to Read' : 'Read'}</h2>
	                  <div className="bookshelf-books">
	                    <ol className="books-grid">
	                      {books[key].map((book, index) => (
		                      <li key={book.id}>
		                        <div className="book">
		                          <div className="book-top">
		                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.canonicalVolumeLink})` }}></div>
		                            <div className="book-shelf-changer">
		                              <select value={book.shelf} onChange={(event) => this.handleChange(event.target.value, key, book)}>
		                                <option value="none" disabled>Move to...</option>
		                                <option value="currentlyReading">Currently Reading</option>
		                                <option value="wantToRead">Want to Read</option>
		                                <option value="read">Read</option>
		                                <option value="none">None</option>
		                              </select>
		                            </div>
		                          </div>
		                          <div className="book-title">{book.title}</div>
		                          {book.authors.map((authors) => (
		                          	<div className="book-authors" key={authors}>{authors}</div>
	                          	  ))}
		                        </div>
		                      </li>
          		       	  ))}
	                    </ol>
	                  </div>
	                </div>
       	  		))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search" >Add a book</Link>
            </div>
          </div>
		)
	}
}

export default ListBooks