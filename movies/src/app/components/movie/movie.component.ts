import { Component, OnChanges, OnInit } from '@angular/core';
import { Favorite, Movie, MovieService } from 'src/app/services/movie.service';
import {tap } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnChanges {
  movies: Movie[] = []
  favorite: Partial<Favorite> = {
    userId: 0,
    movieId: 0
  }

  user!: {
    id: number,
    email: string
  }

  like: boolean [] = [];

  favorites: Favorite[] = [];

  userFavorites: Favorite[] = [];

  constructor(private movieSrv: MovieService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('UserData')!)
    if (this.user) {

    this.printMovies();

    }

  }
  ngOnChanges(){
    this.user = JSON.parse(localStorage.getItem('UserData')!);
    this.printMovies();
  }
getFav(){

  return this.movieSrv.getFav().pipe(tap(data => {
      this.favorites = data;
  }));
}
  printMovies() {

    this.movieSrv.getMovies().pipe(tap(ris => {
      this.movies = ris;
      console.log("array_movies:",this.movies);

    })).subscribe(()=> {
      this.movieSrv.getFav().pipe(tap(data => {
      this.favorites = data;
      console.log(this.favorites);
      let k=0;
      this.favorites.forEach(f=>{
        if (f.userId==this.user.id)
        {
          this.userFavorites[k]=f;
          k++;
        }
      })

      console.log('favoriti_utente',this.userFavorites);
      console.log('user id:',this.user.id);

      let j=0;
      let i=0;
      while(j<this.userFavorites.length)
      {
        if(this.movies[i].id==this.userFavorites[j].movieId)
        {
          this.movies[i].like=true;
          j++;
          i=0;
        }
        if(i==this.movies.length) {
          j++;
          i=0;
        }
        i++;
      }

    })).subscribe()
    });


  }


  addFav(idMovie: number) {
    if(this.user){
    this.favorite = { userId: this.user.id, movieId: idMovie }
    this.movieSrv.setFav(this.favorite)
    console.log("sono user",this.user);
  }}
cancFav(idFavorite:number){


  if(this.user){
    this.movieSrv.cancFav(idFavorite);
  }

}
joinFavorite(idMovie:number,favorites:Favorite[]):number{
let idFavorite=-1;
console.log(favorites);

this.favorites.forEach(f=> {


    if(f.movieId==idMovie && f.userId == this.user.id)
    {
      idFavorite=f.id;
      console.log("favorito id:",idFavorite);

    }

  });
return idFavorite;
}

  toggleFav(idMovie: number){
    let curPos=0;
    this.movies.forEach((m,i)=>{
      if(m.id==idMovie) {
        this.movies[i].like=!this.movies[i].like;
        curPos=i;
      };

    })
    if(this.movies[curPos].like)this.addFav(idMovie);
    else {
      this.getFav().subscribe(data=> {
              let id_fav=this.joinFavorite(idMovie, this.favorites);
              this.cancFav(id_fav);
      }
   );
       }

  }

}
