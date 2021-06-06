import React, { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const Search = ({ getResults, data, getSelected, searchKey = "name" }) => {
  const [items, setItems] = useState([])

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
    console.log({ string, results, items })
    getResults({ variables: { key: string } })
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log('selected', {item})
    if (item) {
     getSelected(item)
    }
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  return (
    <div style={{ width: '100%', zIndex: 3 }}>
      <ReactSearchAutocomplete
        autoFocus
        items={items}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        inputDebounce={0}
        fuseOptions={fuseOptions}
        resultStringKeyName={searchKey}
      />
    </div>
  );
};

export default Search;
