import { Component } from '@angular/core';
import { CellData, DataService, TreasureMap } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  newFileUrl: string = '';
  map!: TreasureMap;
  hoveredCell!: CellData;

  description = {
    treasure: 'Vous devez passer par dessus pour le ramasser !',
    mountain: 'Les montagnes ne sont pas franchissables.',
    player: "C'est un aventurier.",
  };
  error = '';

  constructor(private ds: DataService) {}

  postFile(event: Event) {
    let files = (event.target as HTMLInputElement).files;
    console.log('files', files);
    if (files) {
      console.log('file', files[0]);
      this.ds.postFile(files[0]).subscribe((response) => {
        console.log('response', response);
        this.newFileUrl = response.data.newFileUrl;
      });
    }
    // Reset input value
    (event.target as HTMLInputElement).value = '';
  }
}
