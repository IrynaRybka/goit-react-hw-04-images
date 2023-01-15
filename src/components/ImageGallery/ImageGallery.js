import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ hits, onImgClick }) {
  return (
    <ul className={css.ImageGallery}>
      {hits.map(hit => (
        <ImageGalleryItem
          key={hit.id}
          webformatURL={hit.webformatURL}
          largeImageURL={hit.largeImageURL}
          openModal={onImgClick}
        />
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  onImgClick: PropTypes.func.isRequired,
};
