'use client';
import { ReactNode } from 'react';

interface OverlayProps {
  children?: ReactNode;
  header?: ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Overlay = ({ children, header, isOpen, setIsOpen }: OverlayProps) => {
  return (
    <div className={isOpen ? 'overlay open' : 'overlay'}>
      <div className="overlay-content-container">
        <div className="overlay-content">
          <div className="overlay-content-header">
            {header}
            <i
              className="fa fa-window-close"
              id="overlay-close"
              onClick={() => setIsOpen(false)}
            ></i>
          </div>
          <div className="overlay-content-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
