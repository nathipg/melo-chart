import { Link } from '../Link';

import style from './SongList.module.scss';

const SongList = (props) => {
  const { songs } = props;

  return (
    <ul className={style.SongList}>
      {songs.map(song => {
        return (
          <li key={song.id}>
            <Link to={{ pathname: '/chart', search: `?id=${song.id}` }}>{song.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export { SongList };
