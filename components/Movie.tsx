import React from 'react';
import Router from 'next/router';
import Link from 'next/link';

import Image from './Image';

import { getImageSrc } from '../utils/apiCalls';

const Movie = (props) => {
   const prefetchMoviePage = () => {
        Router.prefetch(`/movie?id=${props.id}`);
    };

        const { id, poster_path, title, overview } = props;
        return (
            <Link as={`/movie/${id}`} href={`/movie?id=${id}`}>
                <div className="card" id={`movie-${id}`} onMouseEnter={prefetchMoviePage}>
                    <div className="card-image">
                        <Image src={getImageSrc(poster_path, 342)} alt={`Poster for ${title}`} className="img-responsive" />
                    </div>
                    <div className="card-header">
                        <div className="card-title h5 text-primary text-ellipsis">{title}</div>
                    </div>
                    <div className="card-body text-ellipsis">{overview}</div>
                </div>
            </Link>
        );
}

export default Movie;