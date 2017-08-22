import React from 'react'

export const Footer = () => (
  <footer className='footer'>
    <div className='footer-body container'>
      <p className='footer-text'>&copy; 2017 nib nz limited, 48 Shortland St, Auckland. All rights reserved</p>
      <ul className='footer-list'>
        <li className='footer-list-item is-terms-and-conditions'>
          <a href='https://www.nibfirstchoice.co.nz/terms-and-conditions' target='_blank'>Terms &amp; conditions</a>
        </li>
        <li className='footer-list-item is-privacy-policy'>
          <a href='https://www.nibfirstchoice.co.nz/privacy-policy' target='_blank'>Privacy policy</a>
        </li>
        <li className='footer-list-item is-faq'>
          <a href='https://www.nibfirstchoice.co.nz/provider' target='_blank'>FAQ</a>
        </li>
      </ul>
    </div>
  </footer>
)

export default Footer
