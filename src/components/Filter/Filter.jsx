import css from './Filter.module.css';
import { useDispatch } from 'react-redux';
import { update } from 'redux/filter/slice';

const Filter = () => {
  const dispatch = useDispatch();

  const onChangeFilter = e => {
    const filter = e.currentTarget.value.trim();
    dispatch(update(filter));
  };

  return (
    <label className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        name="filter"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={onChangeFilter}
      ></input>
    </label>
  );
};
export default Filter;
