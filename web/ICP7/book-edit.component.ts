import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  bookForm: FormGroup;
  isbn: string = '';
  title: string = '';
  description: string = '';
  author: string = '';
  publisher: string = '';
  published_year: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  book = {};
  prev_data = {};
  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
    this.bookForm = this.formBuilder.group({
      'isbn': '',
      'title': '',
      'description': '',
      'author': '',
      'publisher': '',
      'published_year': ''
    });

  }
  getBookDetails(id) {
    this.api.getBook(id)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      });
  }
  onFormSubmit(form: NgForm) {
    this.api.getBook(this.route.snapshot.params['id'])
      .subscribe(data => {
        this.prev_data = data;
        // console.log('prev_data', this.prev_data);
        this.api.updateBook(this.route.snapshot.params['id'], form, this.prev_data)
          .subscribe(res => {
            // console.log('result', res);
            // let id = res['_id'];
            this.router.navigate(['/books']);
          }, (err) => {
            console.log(err);
          });
      });

  }


}
