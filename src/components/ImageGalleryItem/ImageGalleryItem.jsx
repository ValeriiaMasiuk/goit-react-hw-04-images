import PropTypes from 'prop-types';

import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ img, onImageClick }, { key }) => {
    return (
            <ImageItem key={key}>
                <Image src={img.webformatURL} alt={img.tags} onClick={onImageClick} />
            </ImageItem>
    )
}

export default ImageGalleryItem

ImageGalleryItem.propTyes = {
    key: PropTypes.number,
    onImageClick: PropTypes.func,
    img: PropTypes.object,
}