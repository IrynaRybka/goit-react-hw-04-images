import { Component } from 'react';

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

export default class App extends Component {
  state = {
    query: '',
    hits: [],
    page: 1,
    status: 'idle',
    showModal: false,
    modalImage: '',
  };

  handleSubmitForm = async (query, page) => {
    try {
      const { hits } = await api(query, page);
      if (hits.length > 0) {
        this.setState({
          status: 'resolved',
          hits: [...hits],
          page: 1,
          query,
        });
      } else {
        this.setState({ status: 'idle' });
        toast.info('Нет таких картинок, попробуйте другое слово');
      }
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  loadMore = async () => {
    this.setState({ status: 'pending' });
    const nextPage = this.state.page + 1;
    try {
      const { hits } = await api(this.state.query, nextPage);
      this.setState(prevState => ({
        status: 'resolved',
        hits: [...prevState.hits, ...hits],
        page: prevState.page + 1,
        query: this.state.query,
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      modalImage: largeImageURL,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { status, hits, page, query } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <ToastContainer position="top-left" theme="colored" />
          <Searchbar onSubmit={this.handleSubmitForm} />
          <div className={css.text_idle}>
            <p>Напишите какие картинки вы хотите увидеть. Например "cat"</p>
          </div>
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitForm} />
          <Loader />
          <ImageGallery hits={hits} onImgClick={this.openModal} />
          {this.state.showModal && (
            <Modal onClose={this.toggleModal}>
              <button
                type="button"
                onClick={this.toggleModal}
                className={css.close_btn}
              >
                <IoCloseSharp className={css.close_btn_icon} />
              </button>
              <img
                className={css.largeImageURL}
                src={this.state.modalImage}
                alt="your query"
              />
            </Modal>
          )}
          {page > 1 && (
            <Button type="button" onClick={this.loadMore}>
              Load more
            </Button>
          )}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitForm} />
          <p>Упс, что-то пошло не так. Попробуйте чуть позже</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div>
          <Searchbar onSubmit={this.handleSubmitForm} />
          <ImageGallery
            query={query}
            page={page}
            hits={hits}
            onImgClick={this.openModal}
          />

          {page > 0 && (
            <Button type="button" onClick={this.loadMore}>
              Load more
            </Button>
          )}
          {this.state.showModal && (
            <Modal onClose={this.toggleModal}>
              <button
                type="button"
                onClick={this.toggleModal}
                className={css.close_btn}
              >
                <IoCloseSharp className={css.close_btn_icon} />
              </button>
              <img
                className={css.largeImageURL}
                src={this.state.modalImage}
                alt="your query"
              />
            </Modal>
          )}
        </div>
      );
    }
  }
}
