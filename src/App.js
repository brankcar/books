import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import * as _ from 'lodash'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: {}, // currently_reading 正在阅读, wantToRead 想要阅读, read 已读
    searchList: [] // 搜索列表
  }
  // 应用启动时请求一次图书列表
  componentDidMount() { 
    BooksAPI.getAll().then((books) => {
      let obj = {}
      for(let i = 0; i < books.length; i++){
        if(!obj[books[i].shelf]){
          obj[books[i].shelf] = new Array(books[i]);
        }else{
          obj[books[i].shelf].push(books[i]);
        }
      }
      this.setState({ books: obj })
    })
  }
  // 下拉选项切换书籍栏目
  changeSelect(shelf, key, item) { 
    BooksAPI.update(item, shelf).then((book) => {
      this.setState((state) => {
        const { books, searchList} = this.state
        item.shelf = shelf;
        // 不为书籍 shelf 不为 none 时代表添加到列表
        if(shelf !== 'none'){
          books[shelf] = books[shelf].concat([ item ])
        }
        // 判断 key 的 typeof, 
        // 如果值为 number 从搜索列表删除当前已切换阅读栏目的书籍，
        // 如果值为 string 书籍列表切换
        if(typeof key === 'number'){
          searchList.splice(key,1)
          this.setState((state) => ({
            searchList: searchList
          }))
        }else if(typeof key === 'string'){
          books[key] = books[key].filter((book) => item.id !== book.id)
        }
        return {
          books: books
        }
      })
    })
  }

  // 搜索书籍
  searchBooks = _.debounce((query) => {
    if(query){
      BooksAPI.search(query).then((list) => {
        if(Array.isArray(list)){
          this.setState((state) => {
            let books = Object.values(state.books)
            let booksList = []
            for(let i = 0; i < books.length; i++){
              // 解构
              booksList = [...booksList, ...books[i]]
            }

            books = booksList

            const newSearchList = list.map((book) => {
              // 如果该图书在书架中，会返回该图书，否则返回 undefined
              const searchListInshelfBook = books.find(
                shelfBook => shelfBook.id === book.id
              )
              // 同步 shelf 值，并返回该新的图书对象
              return {
                ...book,
                shelf: searchListInshelfBook ? searchListInshelfBook.shelf : 'none'
              }
            })
            return {
              searchList: newSearchList
            }
          })
        }else{
          this.setState({
            searchList: []
          })
        }
      })
    }else{
      this.setState({
        searchList: []
      })
    }
  }, 400)

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks 
            onChangeSelect={(shelf, key, item) => {
              this.changeSelect(shelf, key, item)
            }} 
            books={this.state.books} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks 
            onSearch={(query) => {
              this.searchBooks(query)
            }}
            searchList={this.state.searchList}
            onChangeSelect={(shelf, index, item) => {
              this.changeSelect(shelf, index, item)
            }}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
