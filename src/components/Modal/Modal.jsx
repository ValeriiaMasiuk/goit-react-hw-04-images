import { useEffect } from "react";
import { createPortal } from "react-dom";

import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root')

const Modal = ({onClose, image}) => {
   
    useEffect(() => {
        const handleKeyDown = (evt) => {
            if (evt.code === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    const handleBackdropClick = evt => {
        if (evt.target.nodeName === 'DIV') {
            onClose()
        }
    }

    return createPortal(
            <Overlay onClick={handleBackdropClick}>
                <ModalWindow>
                    <img src={image} alt="" />
                </ModalWindow>
        </Overlay>,
            modalRoot
        );
    }

export default Modal