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

export { parseMovieData };
export { concatData };
