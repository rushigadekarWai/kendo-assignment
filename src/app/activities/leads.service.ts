import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Lead {
  id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  StatusID: number;
  AssignedTo: string;
  LeadSource: string;
  CompanyName: string;
  Notes: string;
  LeadScore: number;
  IsQualified: boolean;
  CreatedDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  private apiUrl = 'http://localhost:3000/leads';

  constructor(private http: HttpClient) {}

  getLeads(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  updateLead(lead: Lead): Observable<any> {
    return this.http.put(`${this.apiUrl}/${lead.id}`, lead);
  }

  save(lead: Lead, isNew: boolean): Observable<any> {
    if (isNew) {
      // No ID needed, let JSON server auto-generate
      const { id, ...leadWithoutId } = lead;  // Remove ID just in case
      return this.http.post(this.apiUrl, leadWithoutId);
    } else {
      // Use PUT with ID to update
      return this.http.put(`${this.apiUrl}/${lead.id}`, lead);
    }
  }
  


  deleteLead(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  saveLead(lead: Lead): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${lead.id}`, lead);
  }

  addLead(lead: Lead): Observable<void> {
    return this.http.post<void>(this.apiUrl, lead);
  }
}
