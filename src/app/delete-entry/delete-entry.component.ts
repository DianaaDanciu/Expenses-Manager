import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntryService } from '../entry.service';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-delete-entry',
  standalone: true,
  imports: [ MatListModule, MatCardModule, MatButtonModule, MatButton, NgStyle],
  templateUrl: './delete-entry.component.html',
  styleUrl: './delete-entry.component.css'
})
export class DeleteEntryComponent implements OnInit{
  entry = {
    description: '',
    value: 0,
    isExpense: false
  }
  id: any;

  constructor(private route: ActivatedRoute, private service: EntryService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getEntry(this.id).subscribe((data: any) => {
      console.log(data);
      this.entry.description = data.Description;
      this.entry.isExpense = data.IsExpense;
      this.entry.value = data.Value;
    })
  }

  cancel() {
    this.router.navigate(['/']);
  }

  confirm() {
    this.service.deleteEntry(this.id).subscribe((data) => {
      console.log('Result data: ', data);
      this.router.navigate(['/entries']);
    });
  }
}
