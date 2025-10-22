import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpandingLoaderComponent } from './shared/components/expanding-loader/expanding-loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ExpandingLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'DEEPSHOP';
}
