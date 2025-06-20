import { Link } from '../Link';

import style from './SongList.module.scss';

const SongList = (props) => {
  const { songs } = props;

  return (
    <div>
      <h2>Song List</h2>
      <ul className={style.SongList}>
        {songs.map(song => {
          return (
            <li key={song.id}>
              <Link to={{ pathname: '/chart', search: `?id=${song.id}` }}>{song.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { SongList };
