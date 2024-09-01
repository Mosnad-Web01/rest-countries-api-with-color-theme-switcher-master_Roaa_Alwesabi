
    import React from 'react';
    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
    import CountryList from './components/CountryList';
    import CountryDetails from './components/CountryDetails';

    const App = () => {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={CountryList} />
                    <Route path="/country/:name" component={CountryDetails} />
                </Switch>
            </Router>
        );
    };

    export default App;
    