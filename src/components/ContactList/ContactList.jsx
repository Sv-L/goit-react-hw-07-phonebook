import css from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts, deleteContact } from '../../redux/contacts/slice';
import { getFilter } from 'redux/filter/slice';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    if (contacts) {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
    }
    return [];
  };

  return filteredContacts().length > 0 ? (
    <ul className={css['contacts-list']}>
      {filteredContacts().map(({ id, name, number }) => (
        <li className={css['contacts-item']} key={id}>
          <p className={css['contacts-name']}>{name}</p>
          <p className={css['contacts-number']}>{number}</p>
          <button
            type="button"
            className={css['delete-btn']}
            onClick={() => dispatch(deleteContact(id))}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  ) : filter !== '' ? (
    <p className={css['contacts-text']}>
      There are no saved contacts with this name.
    </p>
  ) : (
    <p className={css['contacts-text']}>There are no contacts.</p>
  );
};

export default ContactList;
