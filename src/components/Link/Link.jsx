import { Link as RRLink } from 'react-router';

import style from './Link.module.scss';

const Link = (props) => {
  const { children, ...otherProps } = props;

  return (
    <RRLink className={style.Link} {...otherProps}>
      {children}
    </RRLink>
  );
};

export { Link };
