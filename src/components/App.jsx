import { Component } from "react";
import { ToastContainer } from "react-toastify";

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreButton from "./Button/Button";
import Loader from "./Loader/Loader";
import Error from "./Error/Error";
import Modal from "./Modal/Modal";

const API_KEY = '29530903-57a4a13660c15182aca557193';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    totalHits: null,
    error: null,
    status: 'idle',
    isModalOpen: false,
    modalImage: '',
  }

  handleFormSubmit = searchQuery => {
    this.setState({
      images: [],
      searchQuery,
      error: null,
      page: 1,
    })
  }

  getNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }

  componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.page !== this.state.page) {
      this.setState({ status: 'pending' });
      fetch(`https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject( new Error(`Sorry, there is no images with value ${this.state.searchQuery}`))
        })
        .then(data => {
          if (data.totalHits !== 0) {
            this.setState(state => ({
            images: [...state.images, ...data.hits],
            totalHits: data.totalHits,
            status: 'resolved',
          }))           
          } else {
            this.setState({
              status: 'rejected',
              error: `There is no images for ${this.state.searchQuery}`,
            })
          };
        })
        .catch(error => this.setState({error, status: 'rejected'}))
  }
  }

  openModal = (evt) => {
      const searchImg = this.state.images.find(image => image.webformatURL === evt.currentTarget.src
    ).largeImageURL
    this.setState({isModalOpen: true, modalImage: searchImg})
  }

  closeModal = () => {
    this.setState({isModalOpen: false, modalImage: ''})
  }

  render() {

    const { images, error, status, totalHits, isModalOpen, modalImage } = this.state;

      return (
    <div
      style={{
        height: '100vh',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
          }}>

          <Searchbar onSubmit={this.handleFormSubmit} />
          {status === 'rejected' && <Error message={error} />}
          {status === 'pending' && <Loader />}
          <ImageGallery images={images} onImageClick={this.openModal} />
          {isModalOpen && <Modal image={modalImage} onClose={this.closeModal} />}
          {images.length !== 0 && images.length !== totalHits && (<LoadMoreButton onClick={this.getNextPage}/>)}
          <ToastContainer autoClose={2000} />          
          
    </div>
  );
  }
};

export default App
