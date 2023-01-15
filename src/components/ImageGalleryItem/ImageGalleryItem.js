import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ 
   webformatURL, largeImageURL, openModal }) {
   
  return (
    <li className={css.ImageGalleryItem} >
      <img
        className={css.ImageGalleryItem_image}
        onClick={() => openModal(largeImageURL)}
        src={webformatURL}
        alt='imageQuery'
      />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
