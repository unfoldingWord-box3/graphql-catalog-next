import React, { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const Search = ({ getResults, data, getSelected, searchKey = "name" }) => {
  const [items, setItems] = useState([])
  const [query, setQuery] = useState("")

  const fuseOptions = {

    keys: [
      searchKey
    ],

  }

  useEffect(() => {
    if (data) {
      setItems(data[Object.keys(data)[0]])
    }
  }, [data])

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.

    if( string.length > 3 && (!query || !string.includes(query))) {
      setQuery(string)
      console.log("queryString",string)
      console.log("results",results)
      getResults({ variables: { key: string } })
      return
    }

  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log('selected', {item})
    if (item) {
     getSelected(item)
    }
  }

  return (
    <div style={{ width: '100%', zIndex: 3 }}>
      <ReactSearchAutocomplete
        autoFocus
        items={items}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        inputDebounce={200}
        fuseOptions={fuseOptions}
        resultStringKeyName={searchKey}
      />
    </div>
  );
};

export default Search;
