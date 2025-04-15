import { Routes } from '@angular/router';
import path from 'path';
import { LayoutComponent } from './layout/layout.component';
import { TabstripsComponent } from './tabstrips/tabstrips.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgentManagementComponent } from './agent-management/agent-management.component';
import { CalendarComponent } from '@progress/kendo-angular-dateinputs';
import { EzQuoteComponent } from './ez-quote/ez-quote.component';
import { LeadManagementComponent } from './lead-management/lead-management.component';
import { ActivitiesComponent } from './activities/activities.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'tabs', component: TabstripsComponent }, // Default route
      { path: 'dashboard', component: DashboardComponent },
      { path: 'agent-management', component: AgentManagementComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'ez-quote', component: EzQuoteComponent },
      { path: 'lead-management', component: LeadManagementComponent },
      { path: 'activities', component: ActivitiesComponent },
      { path: 'workflows', component: WorkflowsComponent },
      { path: 'chat', component: ChatComponent },
      { path: '', redirectTo: 'tabs', pathMatch: 'full' }
    ]
  }

];
