import { useEffect, useRef } from 'react';

import style from './ContextMenu.module.scss';

const ContextMenu = (props) => {
  const { items, top, left, contextMenuPosition, setContextMenuPosition } = props;

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setContextMenuPosition(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setContextMenuPosition, wrapperRef, contextMenuPosition]);

  return (
    <div 
      ref={wrapperRef}
      className={style.ContextMenu} 
      style={{
        top, 
        left, 
      }}>
      {items.map(item => {
        return (
          <span 
            key={`item-${item.label}`}
            className={style.ContextMenuItem}
            onClick={() => {
              setContextMenuPosition(null);
              item.onClick(contextMenuPosition);
            }}
            data-type={item.type}>
            {item.label}
          </span>
        );
      })}
    </div>
  );
};

export { ContextMenu };
