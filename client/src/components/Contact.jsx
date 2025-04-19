import React from 'react';
import css from './Contact.module.css';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaGithub, FaTelegramPlane } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className={css.contactPage_container}>
      <h1 className={css.contactPage_title}>Связаться с нами</h1>
      <p className={css.contactPage_description}>
      If you have any questions about the posts or would like to submit your own article, feel free to contact us in any convenient way.
      </p>

      <div className={css.contactPage_info}>
        <div className={css.contactPage_item}>
          <FaEnvelope className={css.contactPage_icon} />
          <a href="mailto:blog@example.com">blog@example.com</a>
        </div>
        <div className={css.contactPage_item}>
          <FaTelegramPlane className={css.contactPage_icon} />
          <a href="https://t.me/yourchannel" target="_blank" rel="noopener noreferrer">@yourchannel</a>
        </div>
        <div className={css.contactPage_item}>
          <FaGithub className={css.contactPage_icon} />
          <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer">github.com/yourname</a>
        </div>
      </div>

      <Link to="/" className={css.contactPage_backLink}>← Return to Home</Link>
    </div>
  );
};

export default Contact;
