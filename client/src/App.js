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
import ProfilePage from './pages/Profile';
import Home from './pages/Home';
import About from './pages/About';
import Developments from './pages/Developments';
import Questions from './components/questionList';
import './pages/App.css';
import StripeCheckoutForm from './pages/Donate';


  
  
const httpLink = createHttpLink({
uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
const token = localStorage.getItem('id_token');
return {
    headers: {
    ...headers,
    authorization: token ? `Bearer ${token}` : '',
    },
};
});

const client = new ApolloClient({
link: authLink.concat(httpLink),
cache: new InMemoryCache(),
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
                        <Route exact path="/" component={Home} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/questions" component={Questions} />
                        <Route exact path="/donate" component={StripeCheckoutForm} />
                        <Route exact path="/profile" component={ProfilePage} />
                        <Route exact path="/about" component={About} />
                        <Route exact path="/developments" component={Developments} />

                        <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
