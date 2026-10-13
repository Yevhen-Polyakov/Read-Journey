'use client'

import css from './Modal.module.css'
import Button from "../Button/Button";
import Icon from '../Icon/Icon';
import { useEffect } from 'react';

type Props = {
    className?: string;
    children: React.ReactNode;
    variant: "modal" | "goodModal" |"previewBook" | "theBook";
    onClose: () => void;
}

const Modal = ({className = '', children, variant, onClose, ...props}: Props) => {
     const  modalClassName = [css.modal, css[variant], className].filter(Boolean).join(" ")

    const handleOverlayClip = (e:React.MouseEvent<HTMLDivElement>)=> {
        if(e.target === e.currentTarget) {
            onClose()
        }
    }

    useEffect(()=> {
        document.body.style.overflow = 'hidden';
        
        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", handleKeyDown)

        return ()=> {
            document.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = ''
        }

    }, [onClose])

    return (
        <div className={css.overlay} onClick={handleOverlayClip}>
            <div className={modalClassName} {...props}>
                {children}
                <Button onClick={onClose} variant="close">
                    <Icon variant='close'/>
                </Button>
            </div>

        </div>
    )
}

export default Modal

