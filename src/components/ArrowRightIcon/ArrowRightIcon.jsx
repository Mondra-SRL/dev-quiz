import arrowRightIconMerino from '../../assets/svg/arrow-right-icon-merino.svg';
import arrowRightGray from '../../assets/svg/arrow-right-gray.svg';

function ArrowRightIcon({ disabled = false }) {
  return (
    <img
      src={disabled ? arrowRightGray : arrowRightIconMerino}
      alt=""
      aria-hidden="true"
    />
  );
}

export default ArrowRightIcon;