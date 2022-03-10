import { React, useEffect } from 'react';

const Popup = ({ setIsPopupOpen, setFormPopup, isPopupOpen, children }) => {
  function closePopup() {
    setIsPopupOpen(false);
    setFormPopup(false);
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    }

    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  return (
    <section className={`modal ${isPopupOpen ? 'modal_visible' : ''}`}>
      <div className={`popup popup_type_result ${isPopupOpen ? 'popup_visible' : ''}`}>
        <div className='popup-container'>
          <i className='popup__exit' onClick={closePopup}></i>
          {children}
        </div>
      </div>
    </section>
  );
};

export default Popup;
