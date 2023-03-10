import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_KEY, BASE_URL } from '../../utils/constans';
import SimularColumn from '../../components/simular/simularColumn';
import Title from '../../components/shared/tittle';
import Comment from '../../components/comment/comment';
import EmbedVideoMovie from '../../components/movie/embedVideoMovie';
import MovieInfo from '../../components/movie/movieInfo';
import Navside from '../../components/nav/navSide';
import Footer from '../../components/footer/footer';
import './watch.css';
// import Player from '../../components/TV/Player';

function WatchMovie() {
  const params = useParams();

  const [info, setInfo] = useState({});

  const { id } = params;

  useEffect(() => {
    const getInfo = (id) => {
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => setInfo(data));
    };

    getInfo(id);
  }, [id]);

  return (
    <div>
      <Navside />
      <div className="container bodyside">
        <Title title={`${info?.title} | Watch | Filmmitu`} />

        <div className="watch-movie-container">
          <div className="watch-wrap">
            <EmbedVideoMovie id={id} />
            {/* <Player />  */}
            <MovieInfo info={info} />

            <Comment movieId={id} />
          </div>
          <div className="simularMovie">
            <SimularColumn />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default WatchMovie;
