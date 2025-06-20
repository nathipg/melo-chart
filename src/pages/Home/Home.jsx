import { SongList } from '../../components/SongList';

const Home = (props) => {
  const { songs } = props;

  return (
    <div>
      <SongList songs={songs} />
    </div>
  );
};

export { Home };
