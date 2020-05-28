import { Component, OnInit } from '@angular/core';
import { PresenceItem } from '@presence-demo-root/common-data';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PresenceService } from '../presence.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'presence-demo-root-presence',
  templateUrl: './presence-search.component.html',
  styleUrls: ['./presence-search.component.css']
})
export class PresenceSearchComponent implements OnInit {
  items: PresenceItem[] = [];
  faSearch = faSearch;

  constructor(private presenceService: PresenceService) { }

  ngOnInit(): void {
  }

  search(form: NgForm) {
    console.log('form:', form);

    const search = form.value.search;
    this.presenceService.searchById(search).subscribe(
      v => this.items = v
    );
   }
}
