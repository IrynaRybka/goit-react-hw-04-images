import { ColorRing } from 'react-loader-spinner';
import css from './loader.module.css';
export default function Loader() {
    return (
        <div role="alert" className={css.loader}>
            <ColorRing
  visible={true}
  height="100"
  width="100"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#d5def5', ' #8594e4', '#6643b5', '#430f58', '#240747']}
/>
        </div>
    )
}