import { Component } from "react";
import { createPortal } from "react-dom";

import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root')

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            this.props.onClose();
            }
    }

    handleBackdropClick = evt => {
        if (evt.target.nodeName === 'DIV') {
            this.props.onClose()
        }
    }

    render() {
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalWindow>
                    <img src={this.props.image} alt="" />
                </ModalWindow>
        </Overlay>,
            modalRoot
        );
    }
}

export default Modal