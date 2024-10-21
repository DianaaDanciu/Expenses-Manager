import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { EntryElement } from '../interfaces/EntryElement';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UpdateEntryComponent } from '../update-entry/update-entry.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [MatTableModule, MatButton, RouterModule],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.css'
})
export class EntriesComponent implements OnInit {
  displayedColumns: string[] = ['Description', 'IsExpense', 'Value', 'Actions'];
  dataSource: any;

  constructor (private service: EntryService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource<EntryElement>(data as EntryElement[]);
    });
  }

  updateEntry(entry: EntryElement) {
    console.log(entry);
    this.dialog.open(UpdateEntryComponent, {
      data: {
        Id: entry.Id,
        Description: entry.Description,
        IsExpense: entry.IsExpense,
        Value: entry.Value
      }
    });
  }
}
