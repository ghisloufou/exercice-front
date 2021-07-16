import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

export interface TreasureMap {
  width: number;
  height: number;
  matrix: CellData[][];
}

export interface CellData {
  type: 'Treasure' | 'Player' | 'Mountain' | 'Grass' | 'Treasure&Player' | 'WasPlayer';
  x: number;
  y: number;
  orientation?: number;
  sequence?: string;
  name?: string;
  treasureCount: number;
  playerValue: number;
  lastPlayerName?: number;
  stepCount?: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'http://127.0.0.1:3000/';

  constructor(private http: HttpClient) {
    console.log('postFile error');
  }
  /**
   * Post a file and returns transformed file data
   * @argument {File} file
   * @returns {status: boolean, message: string, newFileUrl: string, map: TreasureMap, newMap: TreasureMap} response
   */
  postFile(file: File): Observable<any> {
    let formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(this.apiUrl + 'upload-file', formData).pipe(
      catchError((error) => {
        console.log('postFile error', error);
        return throwError(error);
      })
    );
  }
}
