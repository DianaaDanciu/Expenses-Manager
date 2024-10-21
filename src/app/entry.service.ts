import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  baseUrl: string = 'https://localhost:44336/api/entries/'

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.baseUrl);
  }

  getEntry(id: any) {
    return this.http.get(this.baseUrl+'/'+id);
  }

  createEntry(entry: any) {
    return this.http.post(this.baseUrl, entry);
  }

  updateEntry(id: any, entry: any) {
    return this.http.put(this.baseUrl+'/'+id, entry);
  }

  deleteEntry(id: any) {
    return this.http.delete(this.baseUrl+'/'+id);
  }
}
