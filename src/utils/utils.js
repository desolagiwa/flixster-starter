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

function concatData(data1,data2){
    if (data1 === null){
        return data2;
    }
    else if (data2 === null){
        return data1;
    }
    data1.results = [...data1.results, ...data2.results]
    return data1;
}

function getMovieDetails(data){
    console.log("data 2:",data);
    const details = [];
    const genres = [];
    for (let i=0;i<data.genres.length;i++){
        genres.push(data.genres[i].name);
    }
    const title = data.original_title;
    const rating = data.vote_average;
    const image = data.poster_path;
    const overview = data.overview;
    const release_date = data.release_date;
    const backdrop_path = data.backdrop_path;
    const runtime = data.runtime;

    details.push({title:title,rating:rating,image:image,overview:overview,release_date:release_date,backdrop_path:backdrop_path,runtime:runtime,genres:genres});
    return details;

}

export { parseMovieData };
export { concatData };
export { getMovieDetails };
