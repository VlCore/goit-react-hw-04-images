import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer } from './Modal.styled';

const Modal = ({ closeImgModal, children }) => {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code === 'Escape') {
        closeImgModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [closeImgModal]);

  return (
    <Overlay
      className="overlay"
      onClick={e => (e.target === e.currentTarget ? closeImgModal() : null)}
    >
      <ModalContainer className="modal">{children}</ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  closeImgModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
