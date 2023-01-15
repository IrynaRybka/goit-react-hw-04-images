import { Component } from 'react';
import { createPortal } from 'react-dom';
import { func, node } from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static defaultProps={
    children: node,
    onClose: func,
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal} >
          {this.props.children}
        </div>
      </div>,
      modalRoot
    );
  }
}
// Modal.propTypes = {
//     children: PropTypes.node.isRequired,
//     onClose: PropTypes.func.isRequired,
// };