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
  }
  get map(): TreasureMap {
    return this._map;
  }

  constructor() {}

  ngOnInit(): void {
  }

  emitHoveredCell(cell: CellData) {
    this.hoveredCellEvent.emit(cell);
  }

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
