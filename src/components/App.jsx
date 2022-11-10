import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreButton from "./Button/Button";
import Loader from "./Loader/Loader";
import Error from "./Error/Error";
import Modal from "./Modal/Modal";

const API_KEY = '29530903-57a4a13660c15182aca557193';

export default function App()  {
  const [images, setImages] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [totalHits, setTotalHits] = useState(null)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('idle')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImage, setModalImage] = useState('')

  const handleFormSubmit = searchQuery => {
    setImages([])
    setSearchQuery(searchQuery)
    setError(null)
    setPage(1)
    setStatus('idle')
  }

  const getNextPage = () => {
    setPage(prevPage => prevPage + 1)
  }

  useEffect(() => {
    if (searchQuery === '') {
      return
    }
    setStatus('pending')

    fetch(`https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error(`Sorry, there is no images with value ${this.state.searchQuery}`))
      })
      .then(data => {
        if (data.total !== 0) {
          setImages(prevState => [...prevState, ...data.hits])
          setTotalHits(data.totalHits)
          setStatus('resolved')
        } else {
          setStatus('rejected')
          setError(`There is no images for ${searchQuery}`)
        };
      })
      .catch(error => {
        setError(error)
        setStatus('rejected')
  })
  }, [searchQuery, page])

  const openModal = (evt) => {
      const searchImg = images.find(image => image.webformatURL === evt.currentTarget.src
    ).largeImageURL
    setIsModalOpen(true)
    setModalImage(searchImg)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalImage('')
  }

      return (
    <div
      style={{
        height: '100vh',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
          }}>

          <Searchbar onSubmit={handleFormSubmit} />
          {status === 'rejected' && <Error message={error} />}
          {status === 'pending' && <Loader />}
          <ImageGallery images={images} onImageClick={openModal} />
          {isModalOpen && <Modal image={modalImage} onClose={closeModal} />}
          {images.length !== 0 && images.length !== totalHits && (<LoadMoreButton onClick={getNextPage}/>)}
          <ToastContainer autoClose={2000} />          
          
    </div>
  );
  }

