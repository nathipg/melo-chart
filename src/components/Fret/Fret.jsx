import { Droppable } from '@hello-pangea/dnd';
import { memo } from 'react';

import { DRAG_TYPES } from '../../constants';

import style from './Fret.module.scss';

const Fret = (props) => {
  const { children, fretIndex } = props;

  return (
    <Droppable droppableId={`fret-${fretIndex}`} type={DRAG_TYPES.CHUNKS_IN_FRET}>
      {(provided) => (
        <div
          className={style.Fret}
          ref={provided.innerRef}
          {...provided.droppableProps}>

          {children}

          {provided.placeholder}
          
        </div>
      )}
    </Droppable>
  );
};

const FretMemo = memo(Fret);

export { FretMemo as Fret };
