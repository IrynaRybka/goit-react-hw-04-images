import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';
import { toast } from 'react-toastify';
import { IoCloseSharp } from 'react-icons/io5';
import { api } from '../services/imgAPI';

import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { useState } from 'react';

export default function App () {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const  handleSubmitForm = async (query, page) => {
    try {
      const { hits } = await api(query, page);
      if (hits.length > 0) {
        setStatus('resolved');
        setHits([...hits]);
        setPage(1);
        setQuery(query);
        scrollDown(); 
      }
     else {
      setStatus('idle');
        toast.info('Нет таких картинок, попробуйте другое слово');
      }
    } catch (error) {
      setStatus('rejected');
    }
  };

  const  loadMore = async () => {
    setStatus('pending');
    const nextPage = page + 1;
    try {
      const { hits } = await api(query, nextPage);
      setStatus('resolved');
      setQuery(query);
      setPage(prevPage => prevPage + 1);
      setHits(prevHits => [...prevHits, ...hits])
      scrollDown();
  } catch (error) {
      setStatus('rejected');
    }
  };

  const scrollDown = () =>{
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  const openModal = largeImageURL => {
    setShowModal(true);
    setModalImage(largeImageURL);
  };

  const  toggleModal = () => {
    setShowModal(!showModal);
  };

  if (status === 'idle') {
    return (
      <div>
        <ToastContainer position="top-left" theme="colored" />
        <Searchbar onSubmit={handleSubmitForm} />
        <div className={css.text_idle}>
          <p>Напишите какие картинки вы хотите увидеть. Например "cat"</p>
        </div>
      </div>
    );
  }

  if (status === 'pending') {
    return (
      <div>
        <Searchbar onSubmit={handleSubmitForm} />
        <Loader />
        <ImageGallery hits={hits} onImgClick={openModal} />
        {showModal && (
          <Modal onClose={toggleModal}>
            <button
              type="button"
              onClick={toggleModal}
              className={css.close_btn}
            >
              <IoCloseSharp className={css.close_btn_icon} />
            </button>
            <img
              className={css.largeImageURL}
              src={modalImage}
              alt="your query"
            />
          </Modal>
        )}
        {page > 1 && (
          <Button type="button" onClick={loadMore}>
            Load more
          </Button>
        )}
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <div>
        <Searchbar onSubmit={handleSubmitForm} />
        <p>Упс, что-то пошло не так. Попробуйте чуть позже</p>
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <div>
        <Searchbar onSubmit={handleSubmitForm} />
        <ImageGallery
          query={query}
          page={page}
          hits={hits}
          onImgClick={openModal}
        />

        {page > 0 && (
          <Button type="button" onClick={loadMore}>
            Load more
          </Button>
        )}
        {showModal && (
          <Modal onClose={toggleModal}>
            <button
              type="button"
              onClick={toggleModal}
              className={css.close_btn}
            >
              <IoCloseSharp className={css.close_btn_icon} />
            </button>
            <img
              className={css.largeImageURL}
              src={modalImage}
              alt="your query"
            />
          </Modal>
        )}
      </div>
    );
  }
}
