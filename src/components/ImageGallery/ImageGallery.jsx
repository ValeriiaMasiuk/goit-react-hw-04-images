import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem"

import { ImagesList } from './ImageGallery.styled';

const ImageGallery = ({images, onImageClick}) => {
    return (
        <ImagesList>
            {images.map(image => (
                <ImageGalleryItem
                    key={image.id}
                    img={image}
                    onImageClick={onImageClick} />
            ))}               
        </ImagesList>
    )
}

export default ImageGallery

ImageGallery.propTypes = {
    images: PropTypes.array,
    onImageClick: PropTypes.func,
}