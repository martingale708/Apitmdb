// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "../styles/card.css";

// const PopularMovies = () => {
//     const [movies, setMovies] = useState([]);

//     useEffect(() => {
//         axios.get('https://api.themoviedb.org/3/movie/popular', {
//             params: {
//                 api_key: 'd56c0a896e4a975b0143f63636887c3d',
//                 language: 'fr-FR',
//                 page: 1
//             }
//         })
//         .then(response => {
//             console.log("Données récupérées :", response.data.results); // Afficher les données dans la console
//             setMovies(response.data.results);
//         })
//         .catch(error => {
//             console.error('Erreur lors de la récupération des films populaires :', error);
//         });
//     }, []);

//     return (
//         <div className="movies">
//             <h1>Films Populaires</h1>
//             <div className="grid-container">
//                 {movies.map(movie => (
//                     <div className="grid-item" key={movie.id}>
//                         <h2>{movie.title}</h2>
//                         <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
//                         <p>Note :{movie.vote_average}</p>
//                         <p>Date de Sortie: {movie.release_date}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PopularMovies;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/card.css";

const PopularMovies = () => {
    const [movies, setMovies] = useState([]);
    const [ratingFilter, setRatingFilter] = useState(""); // État pour le filtre de note
    const [genreFilter, setGenreFilter] = useState(""); // État pour le filtre de genre
    const [genres, setGenres] = useState([]); // État pour stocker les genres disponibles

    useEffect(() => {
        // Récupérer les films populaires
        axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: 'd56c0a896e4a975b0143f63636887c3d',
                language: 'fr-FR',
                page: 1
            }
        })
        .then(response => {
            console.log("Données récupérées :", response.data.results); // Afficher les données dans la console
            setMovies(response.data.results);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des films populaires :', error);
        });

        // Récupérer les genres de films
        axios.get('https://api.themoviedb.org/3/genre/movie/list', {
            params: {
                api_key: 'd56c0a896e4a975b0143f63636887c3d',
                language: 'fr-FR'
            }
        })
        .then(response => {
            setGenres(response.data.genres);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des genres :', error);
        });
    }, []);

    // Filtrer les films en fonction des filtres de note et de genre
    const filteredMovies = movies.filter(movie => {
        const matchesRating = ratingFilter ? movie.vote_average >= ratingFilter : true;
        const matchesGenre = genreFilter ? movie.genre_ids.includes(parseInt(genreFilter)) : true;
        return matchesRating && matchesGenre;
    });

    return (
        <div className="movies">
            <h1>Films Populaires</h1>
            <div className="filters">
                <input 
                    type="number" 
                    placeholder="Filtrer par note" 
                    value={ratingFilter} 
                    onChange={(e) => setRatingFilter(e.target.value)} 
                />
                <select 
                    value={genreFilter} 
                    onChange={(e) => setGenreFilter(e.target.value)}
                >
                    <option value="">Tous les genres</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>
            <div className="grid-container">
                {filteredMovies.map(movie => (
                    <div className="grid-item" key={movie.id}>
                        <h2>{movie.title}</h2>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        <p>Note : {movie.vote_average}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularMovies;

