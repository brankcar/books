# MyReads Project

## 阅读追踪器

## TL;DR

克隆本项目后:

* 安装所有项目依赖项 `npm install`
* 启动开发服务 `npm start`

## 文件列表
```bash
├── CONTRIBUTING.md
├── README.md - 文档.
├── SEARCH_TERMS.md # 白名单.
├── package.json # npm 包管理文件. 无需修改.
├── public
│   ├── favicon.ico # React 图标.
│   └── index.html # 不要随意修改
└── src
    ├── App.css # 应用程序的样式，可以根据需求定制.
    ├── App.js # 这是应用程序的根文件.包含静态HTML.
    ├── BooksAPI.js # 一个API提供的Udacity后端JavaScript.
    ├── ListBooks.js # 书籍列表组件.
    ├── SearchBooks.js # 搜索组件.
    ├── icons # 顾名思义.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # 全局css.
    └── index.js # 仅用于DOM渲染.
```

每个组件单独创建新的js文件，并使用 `import/require` 注入需要该组件的页面.

## 后端服务

有现成的后端服务器 file [`BooksAPI.js`](src/BooksAPI.js) 所需要的接口方法:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

方法签名:

```js
getAll()
```

* 返回一个 Promise，解析为包含一个图书对象集合的JSON对象.
* 此集合表示当前应用程序中的书架中的图书.

### `update`

方法签名:

```js
update(book, shelf)
```

* book: `<Object>` 至少包含一个 `id` 属性
* shelf: `<String>` 包含一个 ["wantToRead", "currentlyReading", "read"]  
* 返回一个 Promise 它解析为包含POST请求的响应数据的JSON对象

### `search`

方法签名:

```js
search(query)
```

* query: `<String>`
* 返回一个 Promise，解析为包含最多20个图书对象集合的JSON对象.
* 这些书不知道他们放在哪一个架子上. 它们只是原始结果. 在搜索页面上，需要确保图书的状态是正确的.


## Create React App

该项目映射于 [Create React App](https://github.com/facebookincubator/create-react-app). 
