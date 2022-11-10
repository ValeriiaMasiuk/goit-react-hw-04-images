import { useState } from "react"; 
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar, SearchForm, SearchBtn, Input, SearchIcon } from "./Searchbar.styled";

const Searchbar = ({onSubmit}) => {
    const [inputValue, setInputValue] = useState('')


  const handleInputChange = evt => {
    setInputValue(evt.currentTarget.value.toLowerCase())
  }

  const handleSubmit = evt => {
    evt.preventDefault()

    if (inputValue.trim() === '') {
      return toast.error('Pls, enter data to search')
    }
    onSubmit(inputValue)
    setInputValue('')
  }
 
    return (          
          <SearchBar>
            <SearchForm onSubmit={handleSubmit}>
              <SearchBtn type="submit">
                <SearchIcon/>
              </SearchBtn>

              <Input
                type="text"
                autoComplete="off"
                autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
            value={inputValue}
              />
              </SearchForm>
            </SearchBar>
  );
};

export default Searchbar;