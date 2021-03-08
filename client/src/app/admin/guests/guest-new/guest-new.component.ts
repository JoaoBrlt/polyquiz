import { Component, OnInit } from '@angular/core';
import { Guest } from '../../../../models/guest.model';
import { GuestService } from '../../../../services/guest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-new',
  templateUrl: './guest-new.component.html',
  styleUrls: ['./guest-new.component.scss']
})
export class GuestNewComponent implements OnInit {
  constructor(
    private router: Router,
    private guestService: GuestService
  ) {}

  ngOnInit() {}

  /**
   * Creates a guest.
   * @param guest The guest to be created.
   */
  createGuest(guest: Guest) {
    this.guestService.createGuest(
      guest.firstName,
      guest.lastName,
      guest.accessibility
    );
    this.router.navigate(['/admin/guests']);
  }
}
