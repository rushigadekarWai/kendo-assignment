import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskGridComponent } from './components/task-grid/task-grid.component';
import { KENDO_BUTTONS } from "@progress/kendo-angular-buttons";
import { LayoutComponent } from "./layout/layout.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, KENDO_BUTTONS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  styles: [
    `
      .k-button {
        margin: 5px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'kendo-assignment';
  // public folderSVG: SVGIcon = folderIcon;
  public onButtonClick(): void {
    console.log("click");
  }
}
