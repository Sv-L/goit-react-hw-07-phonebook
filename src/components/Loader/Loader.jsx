import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css['loader-wrapper']}>
      <ColorRing
        visible={true}
        height="40"
        width="40"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#fff', '#000', '#fff', '#000', '#fff']}
      />
    </div>
  );
};

export default Loader;
