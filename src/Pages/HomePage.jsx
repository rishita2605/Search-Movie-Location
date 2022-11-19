import { useState } from 'react';

import Autocomplete from "react-autocomplete";

// import PropTypes from 'prop-types';

// import './HomePage.css';

export default function HomePage(props) {

  const [ searchVal, setSearchVal ] = useState(' ');

  // List of items to be displayed in autocomplete's dropdown.
  const items = [
      { label: 'apple' },
      { label: 'banana' },
      { label: 'peach' },
    ];

  return <div className='home-page'>
    <Autocomplete

    items = {items}

    // What value from the items' object should be displayed in the dropdown. 
    getItemValue = { (item) => item.label } 

    /**
     * Renders the dropdown item.
     * 
     * @param item 
     * @param isHighlighted controls whether the item should be highlighted. 
     */
    renderItem = { (item, isHighlighted) => {
      return <div key={item.label} 
      style={{
        background: isHighlighted ? '#bcf5bc' : 'white'
      }}>
        {item.label}
      </div>
    } }

    /**
     * The items should be matched even if the cases don't match.
     * shouldItemRender is invoked for each item in items. The return value of this function 
     * determines whether a dropdown element needs to be displayed or not.
     * 
     * @param item item from list
     * @param value value entered in input
    */
    shouldItemRender = { ( item, value ) => {
      return item.label.toLowerCase().indexOf( value.toLowerCase() ) > -1; 
    } }
    
    value={searchVal}
    onChange={ ( e ) => setSearchVal( e.target.value ) }
    onSelect={ ( val ) => setSearchVal( val ) }

    />
  </div>;
}

HomePage.displayName = 'HomePage';
// HomePage.propTypes = { propname: PropTypes.propType.isRequired,};