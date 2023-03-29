import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider, 
    createHttpLink,
  } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Header from "./components/Navbar";
// import Footer from './components/Footer';
import Login from './components/Login';
import Register from "./components/Register";
// import Profile from './pages/Profile';
// import Home from './pages/Home';


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
                    <Routes>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        {/* <Route exact path="/profile" component={Profile} /> */}
                        {/* <Route exact path="/" component={Home} /> */}
                    </Routes>
                    {/* <Footer /> */}
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;