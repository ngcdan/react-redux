### Redux
  - A reducer's function signature is: (state, action) => newState
  - Dont mutate the redux state object, return a new object if the state changes.
  - The root state value is usually an object.

  reducer.js
  ```
  function counterReducer(state = { value: 0 }, action) {
    switch (action.type) {
      case 'counter/incremented':
        return { value: state.value + 1 }
      case 'counter/decremented':
        return { value: state.value - 1 }
      default:
        return state
    }
  }
```

- Create a Redux store holding the state of your app.
- Its API is { subscribe, dispatch, getState }.

 ```
 let store = createStore(counterReducer)
 ```
- use subscribe() to update the UI in response to state changes.



### react-redux (UI binding library);

- Why use?
 - Understand what a "UI binding library" doeso
 - Subscribe to updates
 - Inside the subscription callback:
   - Get the current store state
   - Extract the data needed by this piece of UI
   - Update the UI with the data
 - If necessary, render the UI with initial state
 - Respond to UI inputs by dispatching Redux actions.
 - So would become very repetitive. In addition, optimizing UI performance would require complicated logic.

- Extracting Data with mapStateToProps
  - Is used for selecting the part of the data from the store that the connected component needs
  - It is called every time the store state changes.
  - It receives the entire store state, and should return an object of data this component needs.

  ```
    function mapStateToProps(state, ownProps?)
  ```

  ```
    function mapStateToProps(state, ownProps) {
      const slug = ownProps.match.params.slug;
      const course = slug && state.courses?.length > 0
        ? state.courses.find(course => course.slug === slug) || null
        : newCourse;

      return {
        courses: state.authors,
        authors: state.authors,
        course,
      };
    }
  // component will receive: props.courses, props.authors, and props.course
  ```

  - Dispatching Actions with mapDispatchToProps
    - Is used for dispatching actions to the store.
      - Dispatch is a function of the Redux store. You call store.dispatch to dispatch an action.
          This is the only way to trigger a state change.
      - By default, a connected component receives props.dispatch and can dispatch actions itself.
      - Connect can accept an argument called mapDispatchToProps,
          which lets you create functions that dispatch when called, and pass those functions as props to your component.
  ```
    const mapDispatchToProps = {
      loadCourses,
      loadAuthors,
      saveCourse,
    }
  ```


  ### using @reduxjs/toolkit

  ```
    npm install @reduxjs/toolkit react-redux
  ```



# Store

```
  import { configureStore } from '@reduxjs/toolkit'
  import counterReducer from '../features/counter/counterSlice'

  export default configureStore({
    reducer: {
      counter: counterReducer
    }
  })
```
configureStore requires that we pass in a reducer argument.
When we pass in an object like counter: counterReducer, let's says that we want to have a state.counter section
 of Redux state object and that we want counterReducer function to being change of deciding if and how to update the
 state.counter section whenever an action is dispatched.

# Redux slice
A slice is an collection of Redux reducer logic and actions for a single feature in app.
```
  import { configureStore } from '@reduxjs/toolkit'
  import usersReducer from '../features/users/usersSlice'
  import postsReducer from '../features/posts/postsSlice'
  import commentsReducer from '../features/comments/commentsSlice'

  export default configureStore({
    reducer: {
      users: usersReducer,
      posts: postsReducer,
      comments: commentsReducer
    }
  })
```

- Redux object tree look like this:

```
  {
    users: ....,
    posts: ....,
    comments: ...,
  }
```

- usersReducer function to being in change of deciding if and how to update the users data.
- postReducer function to being in change of deciding if and how to update the posts data.
- commentsReducer function to being in change of deciding if and how to update the comments data.

### Slice


### Using selector
```
import { useSelector, useDispatch } from 'react-redux'
useSelector((state) => {// get piece of state here});
```
Any time Redux store has been updated, useSelector will re-run our selector function, if selector return a different
value than last time, useSelector will make sure our component re-renders with the new value

### Tailwind CSS

Install Tailwind CSS
```
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
```

TODO:
  -Don't reassign your props to state that is what you are using redux for pulling the values from the store and returning them as props to your component
- ![Writing resilient components](https://overreacted.io/writing-resilient-components/)

- When click Courses from nav bar (Header) , redirect to Course Page

```
const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <NavLink className="nav-link" to="/" activeStyle={activeStyle} exact>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={'nav-link'} to="/courses" activeStyle={activeStyle}>Courses</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={'nav-link'} to="/about" activeStyle={activeStyle}>About</NavLink>
        </li>
      </ul>
    </nav>
  );
}

```
- Render Course Page component
```
function App() {

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/courses' component={CoursePage} />
        <Route path='/course/:slug' component={ManageCoursePage} />
        <Route path='/course' component={ManageCoursePage} />
        <Route path='/about' component={AboutPage} />
        <Route render={() => <h1>Oops! Page not found.</h1>} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div >
  );
}

```

- Course Page expect list courses as a prop, so first, it take list course from Redux store via mapStateToProps.
This code look like this:
```
//Redux mappings
function mapStateToProps(state, _ownProps) {
  return {
    courses: state.courses;
  };
}
```
- If we access store at the first time, store will be init by initial Value in reducer, inital cousers = []
- Then, Course Page is mounting, it will check if courses props equal = [], if true,
    it dispatch an action to loadCourses, loadCourses action need to fetch data from server,
    so this function is an thunk
-
