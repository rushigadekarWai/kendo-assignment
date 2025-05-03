import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { IconsModule, KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { KENDO_AVATAR, KENDO_TABSTRIP, LayoutModule, SelectEvent, StepperIndicatorTemplateDirective } from '@progress/kendo-angular-layout';
import { KENDO_APPBAR } from '@progress/kendo-angular-navigation';
import { Layout } from '@progress/kendo-drawing';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { NgClass, NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import bootstrap from '../../main.server';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-layout',
  imports: [KENDO_APPBAR, KENDO_SVGICON, IconsModule, KENDO_AVATAR, LayoutModule, IndicatorsModule,KENDO_TABSTRIP,RouterOutlet, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  tabs = [
    { label: 'DASHBOARD', icon: 'fas fa-tachometer-alt' },
    { label: 'AGENT MANAGEMENT', icon: 'fas fa-users' },
    { label: 'CALENDAR', icon: 'fas fa-calendar-alt' },
    { label: 'EZ QUOTE', icon: 'fas fa-comment-dollar' },
    { label: 'LEAD MANAGEMENT', icon: 'fas fa-user-tie' },
    { label: 'ACTIVITIES', icon: 'fas fa-tasks' },
    { label: 'WORKFLOWS', icon: 'fas fa-cogs' },
    { label: 'CHAT', icon: 'fas fa-comments' }
  ];

  selectedIndex = 0;

  selectTab(index: number): void {
    this.selectedIndex = index;
  }
  public onTabSelect(e: SelectEvent): void {
    console.log(e);
  }

  private navbarCollapse: any;

  ngAfterViewInit() {
  
  }

  closeNavbar() {
    const navbarElement = document.getElementById('navbarIcons');
    if (navbarElement) {
      // Manually remove the 'show' class to close the navbar
      navbarElement.classList.remove('show');
    }
  }

  isDarkMode: boolean = false;

  // Method to handle the dark mode toggle
  toggleDarkMode() {
    // You can add any logic to change the theme, e.g., applying a class to the body
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
 
}
