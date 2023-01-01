import style from './Modal.module.scss';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

// ({bigImage, onModalClick})
export const Modal = ({ bigImage, onModalClick }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyCklick);
    return () => {
      window.removeEventListener('keydown', onKeyCklick);
    };
  });

  const onKeyCklick = e => {
    if (e.code === 'Escape') {
      onModalClick(e);
    }
  };

  const onModal = e => {
    console.log('modal', e);
    onModalClick(e);
  };

  return (
    <div id="modal" className={style.Overlay} onClick={onModal}>
      <div className={style.Modal}>
        <img src={bigImage} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  bigImage: PropTypes.string.isRequired,
};

// export class Modal extends Component {
//   componentDidMount() {
//     console.log('didM');
//     window.addEventListener('keydown', this.onKeyCklick);
//   }

//   componentWillUnmount() {
//     console.log('ulmount');
//     window.removeEventListener('keydown', this.onKeyCklick);
//   }

//   onKeyCklick = e => {
//     if (e.code === 'Escape') {
//       this.props.onModalClick(e);
//     }
//   };

//   onModalClick = e => {
//     console.log('modal');
//     this.props.onModalClick(e);
//   };

//   render() {
//     return (
//       <div id="modal" className={style.Overlay} onClick={this.onModalClick}>
//         <div className={style.Modal}>
//           <img src={this.props.bigImage} alt="" />
//         </div>
//       </div>
//     );
//   }
// }

// Modal.propTypes = {
//   bigImage: PropTypes.string.isRequired,
// };
