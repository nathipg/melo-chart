import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

const CircleQuestionIcon = () => {
  return (
    <FontAwesomeIcon icon={faCircleQuestion} />
  );
};

const CircleQuestionIconMemo = memo(CircleQuestionIcon);

export { CircleQuestionIconMemo as CircleQuestionIcon };
