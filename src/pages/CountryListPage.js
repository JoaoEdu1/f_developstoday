import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Header from '../components/Header';

const CountryListPage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get('/country/available');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <Header/>
      <div className='container'>
      <h1>Countries</h1>
      <ul>
        {countries.map(country => (
          <li key={country.countryCode}> 
            <Link to={`/country/${country.countryCode}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div> 
      </div>
  );
};

export default CountryListPage;
