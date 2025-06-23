import { Link } from 'react-router';

export const renderSongs = (songs) => {
  if(!songs.length) {
    return (
      <li>No songs here. What about adding one?</li>
    );
  }

  return songs.map(song => {
    return (
      <li key={song.id}>
        <Link to={{ pathname: '/chart', search: `?id=${song.id}` }}>{song.title}</Link>
      </li>
    );
  });
};
