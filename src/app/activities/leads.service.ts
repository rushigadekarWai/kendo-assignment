import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Lead {
  id?: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  StatusID: number;
  AssignedTo: string;
  LeadSource: string;
  CompanyName: string;
  CreatedDate: string;
  Notes: string;
  LeadScore: number;
  IsQualified: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  constructor(private http:HttpClient) { }

  private leadsUrl = 'http://localhost:3000/leads';

 
  // Get all leads
  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.leadsUrl);
  }

  // Get a single lead by ID
  getLead(id: string): Observable<Lead> {
    return this.http.get<Lead>(`${this.leadsUrl}/${id}`);
  }

  // Create a new lead
  addLead(lead: Lead): Observable<Lead> {
    return this.http.post<Lead>(this.leadsUrl, lead);
  }

  // Update a lead by ID
  updateLead(id: string, lead: Lead): Observable<Lead> {
    return this.http.put<Lead>(`${this.leadsUrl}/${id}`, lead);
  }

  // Delete a lead by ID
  deleteLead(id: string): Observable<void> {
    return this.http.delete<void>(`${this.leadsUrl}/${id}`);
  }
}
