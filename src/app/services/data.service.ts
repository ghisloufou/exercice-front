import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  constructor(private http: HttpClient) {}

  /**
   * Get data gathered from the files
   * @returns Observable of data
   */
  getData(): Observable<TreasureMap> {
    return this.http.get<TreasureMap>('url').pipe(
      catchError((error) => {
        return of({
          width: 7,
          height: 4,
        });
      })
    );
  }
}
