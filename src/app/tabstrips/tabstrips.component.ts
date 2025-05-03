import { NgClass, NgFor } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { KENDO_DROPDOWNLIST, KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { IconsModule, KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { KENDO_AVATAR, KENDO_TABSTRIP, LayoutModule } from '@progress/kendo-angular-layout';
import { KENDO_APPBAR } from '@progress/kendo-angular-navigation';
import { DropDownsModule } from "@progress/kendo-angular-dropdowns"
import { RouterOutlet } from '@angular/router';
import { WorkflowsComponent } from "../workflows/workflows.component";
import { LeadManagementComponent } from "../lead-management/lead-management.component";
import { TaskGridLayoutComponent } from "../task-grid-layout/task-grid-layout.component";
import { AgentManagementComponent } from "../agent-management/agent-management.component";
import { ExcelModule, ExcelService, KENDO_GRID_EXCEL_EXPORT } from '@progress/kendo-angular-grid';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { CalendarComponent } from "../calendar/calendar.component";
import { ActivitiesComponent } from "../activities/activities.component";

@Component({
  selector: 'app-tabstrips',
  standalone: true, // ✅ REQUIRED for standalone components
  imports: [
    KENDO_APPBAR,
    KENDO_SVGICON,
    IconsModule,
    KENDO_AVATAR,
    LayoutModule,
    IndicatorsModule,
    KENDO_TABSTRIP,
    KENDO_DROPDOWNBUTTON,
    KENDO_DROPDOWNLIST,
    DropDownsModule,
    WorkflowsComponent,
    LeadManagementComponent,
    TaskGridLayoutComponent,
    AgentManagementComponent, KENDO_GRID_EXCEL_EXPORT, ExcelModule, ExcelExportModule,
    CalendarComponent,
    ActivitiesComponent
],
providers: [ExcelService],
  templateUrl: './tabstrips.component.html',
  styleUrl: './tabstrips.component.css',
})
export class TabstripsComponent {
   // The index of the selected tab
   selectedTab: number = 0;

  ngOnInit(): void {
    // Check localStorage for previously selected tab
    const savedTabIndex = localStorage.getItem('selectedTabIndex');
    if (savedTabIndex !== null) {
      this.selectedTab = parseInt(savedTabIndex, 10);
    }
  }

  // Method to store the selected tab index in localStorage
  // onTabSelect(event: any): void {
  //   localStorage.setItem('selectedTabIndex', event.index.toString());
  //   this.selectedTab = event.index;
  // }

  // selectedTab: number = 0;

  onTabSelect(event: any): void {
    this.selectedTab = event.index;
  }
}