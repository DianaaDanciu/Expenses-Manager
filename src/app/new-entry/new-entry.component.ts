import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Type } from '../interfaces/Type';
import { NgFor } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { EntryService } from '../entry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-entry',
  standalone: true,
  imports: [MatInputModule, MatCardModule, MatSelectModule, ReactiveFormsModule, NgFor, MatButtonModule],
  templateUrl: './new-entry.component.html',
  styleUrl: './new-entry.component.css'
})
export class NewEntryComponent {

  types: Type[] = [
    {value: true, display: 'Expense'},
    {value: false, display: 'Income'},
  ]

  constructor(private service: EntryService, private router: Router) { }

  entryForm = new FormGroup({
    description: new FormControl('', Validators.required),
    isExpense: new FormControl('', Validators.required),
    value: new FormControl('', [Validators.required, Validators.pattern('\\d+\\.?\\d*')])
  });

  onSubmit() {
    console.log(this.entryForm.value);
    this.service.createEntry(this.entryForm.value).subscribe((data) => {
      console.log('Response data: ', data);
      this.router.navigate(['/entries']);
    });
  }

}
