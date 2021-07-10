import { Component, OnInit } from '@angular/core';
import { DataService, TreasureMap, CellData } from '../services/data.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor(private ds: DataService) {}

  map!: TreasureMap;
  matrix: CellData[][] = [];
  hoveredCell: any = undefined;

  ngOnInit(): void {
    // If map is loaded before 50ms then do not init fake map
    setTimeout(() => {
      if (!this.map) {
        this.fillMap();
      }
    }, 50);

    // Get data then fill the map
    this.ds.getData().subscribe((treasureMap) => {
      this.map = treasureMap;
      this.fillMap();
      this.setCell({ value: 1, type: 'mountain', x: 2, y: 2 });
      this.setCell({ value: 2, type: 'treasure', x: 3, y: 2 });
      console.table(this.matrix);
    });
  }

  /**
   * Fill the map with the height and width
   */
  fillMap() {
    if (!this.map) {
      this.map = { width: 10, height: 10 };
    }
    this.matrix = Array(this.map.height)
      .fill(null)
      .map((a, i) => {
        return Array(this.map.width).fill({ value: 1, type: 'grass' });
      });
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
      cell.x <= this.matrix.length &&
      cell.y <= this.matrix[0].length &&
      cell.y > 0
    ) {
      this.matrix[cell.y - 1][cell.x - 1] = cell;
    }
  }

  move(direction: string) {}
}