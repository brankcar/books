import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SearchBooks extends Component {
	state = {
		query: ''
	}

	// 更新query
	updataQuery = (query) => {
		this.setState({
			query: query.trim()
		})
		if(this.props.onSearch){
			this.props.onSearch(query)
		}
	}

	// 监听select
	handleChange(value, index, item) {
		if(this.props.onChangeSelect){
			this.props.onChangeSelect(value, index, item)
		}
	}

	render() {
		return (
		  <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/" >Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" value={this.state.query} onChange={(event) => this.updataQuery(event.target.value)} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
              	{this.props.searchList.map((book, index) => (
      			  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.canonicalVolumeLink})` }}></div>
                        <div className="book-shelf-changer">
                          <select value={book.shelf} onChange={(event) => this.handleChange(event.target.value, index, book)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      {book.authors && book.authors.map((authors) => (
                      	<div className="book-authors" key={authors}>{authors}</div>
                  	  ))}
                    </div>
                  </li>
          		))}
              </ol>
            </div>
          </div>
		)
	}
}

export default SearchBooks