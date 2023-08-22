import ContactList from './ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts, getError, getIsLoading } from 'redux/contacts/slice';
import Error from 'components/Error';
import Loader from 'components/Loader';

export const App = () => {
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <div className="wrap">
        <ContactForm />
        <div>
          <h2>Contacts</h2>
          <Filter />
          {isLoading ? <Loader /> : error ? <Error /> : <ContactList />}
        </div>
      </div>
    </>
  );
};
