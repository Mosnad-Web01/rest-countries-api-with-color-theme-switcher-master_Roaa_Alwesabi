
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { Link } from 'react-router-dom';

    const CountryList = () => {
        const [countries, setCountries] = useState([]);
        const [searchTerm, setSearchTerm] = useState('');
        const [region, setRegion] = useState('');

        useEffect(() => {
            axios.get('https://restcountries.com/v3.1/all')
                .then(response => setCountries(response.data))
                .catch(error => console.error('Error fetching countries:', error));
        }, []);

        const filteredCountries = countries.filter(country =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (region ? country.region === region : true)
        );

        return (
            <div>
                <input
                    type="text"
                    placeholder="Search for a country..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select onChange={(e) => setRegion(e.target.value)}>
                    <option value="">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
                <div>
                    {filteredCountries.map(country => (
                        <div key={country.cca3}>
                            <Link to={`/country/${country.name.common}`}>
                                {country.name.common}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    export default CountryList;
    