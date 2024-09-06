import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import api from '../services/api';
import Header from '../components/Header/index.js'
import '../components/Header/index.css';
import './CountryListPage.css'

const CountryInfoPage = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [populationData, setPopulationData] = useState([]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await api.get(`/country/info/${countryCode}`);
        const data = response.data;
        setCountry(data);
        setBorderCountries(data.borders || []);
        setPopulationData(data.population || []);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountryData();
  }, [countryCode]);

  useEffect(() => {
    const storedCountry = JSON.parse(sessionStorage.getItem('selectedCountry'));
    if (storedCountry && storedCountry.countryCode === countryCode) {
      setCountry(storedCountry);
    }
  }, [countryCode]);

  if (!country) return <div>Loading...</div>;

  return (
    <div>
      <Header/>
      <div className='container'>
      <h1>{country.name}</h1>
      <img src={country.flagUrl} alt={`${country.name} flag`} />
      <h2>Border Countries:</h2>
      <ul>
        {borderCountries.map(border => (
          <li key={border.countryCode}>
            <Link to={`/country/${border.countryCode}`}>
              {border.commonName}
            </Link>
          </li>
        ))}
      </ul>
      <h2>Population Over Time:</h2>
      <LineChart width={800} height={400} data={populationData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
        </div>
    </div>
  );
};

export default CountryInfoPage;
