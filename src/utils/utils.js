function parseMovieData(data){
    const movies = [];
    for (let i=0;i<data.data.results.length;i++){
        const title = data.data.results[i].original_title;
        const rating = data.data.results[i].vote_average;
        const image = data.data.results[i].poster_path;
        const id = data.data.results[i].id;
        movies.push({title:title,rating:rating,image:image, id:id});
    }
    return movies;
}

export { parseMovieData };
