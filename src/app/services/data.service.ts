import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface TreasureMap {
  width: number;
  height: number;
}

export interface CellData {
  value: any;
  type: 'Treasure' | 'Player' | 'Mountain' | 'Grass';
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) {}

  /**
   * Get data gathered from the files
   * @returns Observable of data
   */
  getData(): Observable<TreasureMap> {
    return this.http.get<TreasureMap>(this.apiUrl + 'data').pipe(
      catchError((error) => {
        return of({
          width: 7,
          height: 4,
        });
      })
    );
  }

  postFile(file: File): Observable<any> {
    let formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl + 'upload-file', formData).pipe(
      catchError((error) => {
        console.log('postFile error', error);
        return of({
          width: 7,
          height: 4,
        });
      })
    );
  }
}
