
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { Link, useParams } from 'react-router-dom';

    const CountryDetails = () => {
        const { name } = useParams();
        const [country, setCountry] = useState(null);

        useEffect(() => {
            axios.get(`https://restcountries.com/v3.1/name/${name}`)
                .then(response => setCountry(response.data[0]))
                .catch(error => console.error('Error fetching country details:', error));
        }, [name]);

        if (!country) return <div>Loading...</div>;

        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Region: {country.region}</p>
                <p>Subregion: {country.subregion}</p>
                <p>Population: {country.population.toLocaleString()}</p>
                <h3>Border Countries:</h3>
                <div>
                    {country.borders?.map(border => (
                        <Link key={border} to={`/country/${border}`}>
                            {border}
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    export default CountryDetails;
    