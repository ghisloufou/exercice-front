import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TreasureMap, CellData } from '../services/data.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Output() hoveredCellEvent = new EventEmitter<CellData>();

  private _map!: TreasureMap;

  @Input() set map(value: TreasureMap) {
    this._map = value;
    this.fillMap();
  }
  get map(): TreasureMap {
    return this._map;
  }

  constructor() {}

  ngOnInit(): void {
    // Get data then fill the map
    // this.ds.dataObservable().subscribe((treasureMap) => {
    //   this.map = treasureMap;
    //   this.fillMap();
    //   this.setCell({ value: 1, type: 'Mountain', x: 2, y: 1 });
    //   this.setCell({ value: 2, type: 'Treasure', x: 3, y: 2 });
    //   console.table(this.matrix);
    // });
  }

  emitHoveredCell(cell: CellData) {
    this.hoveredCellEvent.emit(cell);
  }

  /**
   * Fill the map with the height and width
   */
  fillMap() {
    // if (!this.map) {
    //   this.map = { width: 10, height: 4 };
    // }
    // this.matrix = Array(this.map.height)
    //   .fill(null)
    //   .map((a, i) => {
    //     return Array(this.map.width)
    //       .fill(null)
    //       .map((b, j) => {
    //         return { value: 1, type: 'Grass', x: i + 1, y: j + 1 };
    //       });
    //   });
    if (this.map) {
      this.map.matrix = Array(this.map.height)
        .fill(null)
        .map((a, i) => {
          return Array(this.map.width)
            .fill(null)
            .map((b, j) => {
              return { value: 1, type: 'Grass', x: i + 1, y: j + 1 };
            });
        });
    }
  }

  addItemToArray() {}

  /**
   * Set a value in the map at certain coordinates
   * @param x Horizontal coordinate from 1 to map width
   * @param y Vertical coordinate from 1 to map height
   * @param value Value to be displayed in the map
   */
  setCell(cell: CellData) {
    if (
      cell.x > 0 &&
      cell.x <= this.map.matrix.length &&
      cell.y <= this.map.matrix[0].length &&
      cell.y > 0
    ) {
      this.map.matrix[cell.y - 1][cell.x - 1] = cell;
    }
  }
}
