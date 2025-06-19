import { useEffect, useImperativeHandle, useRef, useState } from 'react';

import style from './ContextMenu.module.scss';

const ContextMenu = (props) => {
  const { items, contextMenuFnsRef } = props;

  const [contextMenuData, setContextMenuData] = useState(null);

  const wrapperRef = useRef(null);

  useImperativeHandle(contextMenuFnsRef, () => {
    return {
      setContextMenuData(data) {
        setContextMenuData(data);
      },
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setContextMenuData(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setContextMenuData, wrapperRef]);

  return contextMenuData ? (
    <div
      ref={wrapperRef}
      className={style.ContextMenu}
      style={{
        top: contextMenuData?.top,
        left: contextMenuData?.left,
      }}>
      {items.map(item => {
        return (
          <span
            key={`item-${item.label}`}
            className={style.ContextMenuItem}
            onClick={() => {
              setContextMenuData(null);
              item.onClick(contextMenuData);
            }}
            data-type={item.type}>
            {item.label}
          </span>
        );
      })}
    </div>
  ) : <></>;
};

export { ContextMenu };
