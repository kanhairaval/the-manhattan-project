import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider, 
    createHttpLink,
  } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Header from "./components/Navbar";
import Footer from './components/footer';
import Login from './components/Login';
import Register from "./components/Register";
  // import Profile from './pages/Profile';
import Home from './pages/Home';
  // import Questions from './components/questionList';
  
  
  const httpLink = createHttpLink({
      uri: '/graphql',
      credentials: 'same-origin'
  });
  
  const authLink = setContext((_, { headers }) => {
      const token = localStorage.getItem('id_token');
      return {
          headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : '',
          }
      };
  });
  
  const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache()
  });
  
  function App() {
      return (
          <ApolloProvider client={client}>
              <Router>
                  <div>
                      <Header />
                      <Switch>
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                          {/* <Route exact path="/profile" component={Profile} /> */}
                            <Route exact path="/" component={Home} />
                            <Route exact path="/home" component={Home} />
                            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
                      </Switch>
                      {/* <Questions></Questions> */}
                      {/* <Register></Register> */}
                      <Footer />
                  </div>
              </Router>
          </ApolloProvider>
      );
  }
  
  export default App;