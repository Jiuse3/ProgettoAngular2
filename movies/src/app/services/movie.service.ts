import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

export interface Movie {
  poster_path: string,
  title:string,
  id: number,
  like: boolean
}
export interface Favorite {
  userId: number,
  movieId: number,
  id: number
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  user! : {id: number, email: string };

  constructor(private http: HttpClient, private authSrv: AuthService) { }

  getMovies(){
    return this.http.get<Movie[]>(`http://localhost:4201/api/movie/popular`);
  }

  setFav(favorite:Partial<Favorite>){
    console.log("favorite",favorite);
    return this.http.post(`http://localhost:4201/api/favorites/`, favorite).subscribe();
  }

  cancFav(movieId: number){
    return this.http.delete(`http://localhost:4201/api/favorites/` + movieId).subscribe();
  }

  getFav(){
   return this.http.get<Favorite[]>('http://localhost:4201/favorites');
  }

}
