// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { useEffect, useState } from 'react';
import Button from '../button/button';
import useInnerWidth from '../../hooks/useInnerWidth';
import Skeleton from '../skeleton/skeleton';
import './slider.css';
import { API_KEY, BASE_URL } from '../../utils/constans';
import { Link } from 'react-router-dom';
import MovieItem from '../movie/movieItem';

const SliderMovie = ({ type }) => {
  SwiperCore.use([Navigation]);

  const [movie, setMovie] = useState([]);

  const [loading, setLoading] = useState(true);

  const width = useInnerWidth();

  let item;

  if (width >= 1024) {
    item = 5;
  } else if (width < 1024 && width >= 740) {
    item = 4;
  } else if (width < 740 && width >= 500) {
    item = 3;
  } else {
    item = 2;
  }

  useEffect(() => {
    const getMovie = () => {
      fetch(
        type === 'trending'
          ? `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
          : `${BASE_URL}/movie/${type}?api_key=${API_KEY}`
      )
        .then((res) => res.json())
        .then(async (data) => {
          await setMovie(data.results);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    setLoading(true);
    getMovie();
  }, [type]);

  return (
    <div className="slider">
      <div className="title">
        <h1>Film {type}</h1>
        <Link to={`/movie/${type}`}>
          <Button content={'Xem thêm'} />
        </Link>
      </div>
      <Swiper
        navigation
        grabCursor={true}
        spaceBetween={20}
        slidesPerView={item}
      >
        {!loading ? (
          movie.map((item) => (
            <SwiperSlide key={item.id}>
              <Link to={`/details/movie/${item.id}`}>
                <MovieItem data={item} />
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <div className="grid-layout grid-gap-1rem-1rem">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default SliderMovie;
