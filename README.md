# React redux

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