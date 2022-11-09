import { Component } from "react"; 
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { SearchBar, SearchForm, SearchBtn, Input, SearchIcon } from "./Searchbar.styled";

class Searchbar extends Component {
  state = {
    inputValue: ''
  }

  handleInputChange = evt => {
    this.setState({inputValue: evt.currentTarget.value.toLowerCase()})
  }

  handleSubmit = evt => {
    evt.preventDefault()

    if (this.state.inputValue.trim() === '') {
      return toast.error('Pls, enter data to search')
    }
    this.props.onSubmit(this.state.inputValue)
    this.setState({inputValue: ''})
  }
 
render() {
    return (          
          <SearchBar>
            <SearchForm onSubmit={this.handleSubmit}>
              <SearchBtn type="submit">
                <SearchIcon/>
              </SearchBtn>

              <Input
                type="text"
                autoComplete="off"
                autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.inputValue}
              />
              </SearchForm>
            </SearchBar>
  );
  }

};

export default Searchbar;