import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Layout } from '../components';
import { useLazyQuery, gql, ApolloProvider } from '@apollo/client';
import QueryResult from '../components/query-result'


/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Search = ({getResults, loading, error, data}) => {

    
    //if (loading) return <p>Loading ...</p>;
        console.log(data);
        let items = []

        const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
            getResults(  { variables: { key: string } } )
            console.log(string, results)
        }

        const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
        }

        const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
        }

        const handleOnFocus = () => {
        console.log('Focused')
        }
  return (
        
        <div style={{ width: 400 }}>
            
          <ReactSearchAutocomplete
            items={data? data[Object.keys(data)[0]] : items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
          />
        </div>

  );
};

export default Search;
