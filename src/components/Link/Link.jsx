import { memo } from 'react';
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

const LinkMemo = memo(Link);

export { LinkMemo as Link };
