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
