import { useState } from 'react';
import css from './ContactForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addContsct, getContacts } from 'redux/contacts/slice';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleInputChange = e => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const checkNewName = name => {
    if (contacts) {
      const normalizeDataName = name.toLowerCase();
      const nameIsWritten = contacts.some(
        contact => contact.name.toLowerCase() === normalizeDataName
      );
      return nameIsWritten;
    } else {
      return false;
    }
  };

  const handleSubmitForm = async e => {
    e.preventDefault();
    if (!checkNewName(name)) {
      const newContact = { name, number };
      await dispatch(addContsct(newContact));
      reset();
    } else {
      alert(`${name} is already in contacts.`);
    }
    document.activeElement.blur();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmitForm}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleInputChange}
        />{' '}
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={handleInputChange}
        />
      </label>
      <button className={css['add-btn']} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
