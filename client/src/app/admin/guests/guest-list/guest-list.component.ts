// App.
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Styles.
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faUserEdit, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';

// Models and services.
import { Guest } from '../../../../models/guest.model';
import { GuestService } from '../../../../services/guest.service';
import { GuestModalComponent } from '../guest-modal/guest-modal.component';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss'],
})
export class GuestListComponent implements OnInit {
  /**
   * The list of guests.
   */
  public guests: Guest[];

  /**
   * The icons of the rows.
   */
  public createIcon = faUserPlus;
  public editIcon = faUserEdit;
  public deleteIcon = faUserMinus;

  /**
   * The variables of the pagination.
   */
  public page ;
  public pageSize;
  public collectionSize;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private guestService: GuestService,
  ) {
    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = 0;
  }

  ngOnInit(): void {
    // Get the guests.
    this.guestService
      .getGuests()
      .subscribe((guests) => {
        this.guests = guests;
        this.collectionSize = guests.length;
      });
  }

  /**
   * Returns a slice of the guests.
   */
  getGuests(): Guest[] {
    return this.guests
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  /**
   * Returns the accessibility name of a guest.
   * @param guest The guest.
   */
  getAccessibility(guest: Guest) {
    return this.guestService.getAccessibilityName(guest.accessibility);
  }

  /**
   * Creates a guest.
   */
  createGuest() {
    this.router.navigate(['/admin/guests/new']);
  }

  /**
   * Edits a guest.
   */
  editGuest(guest: Guest) {
    this.router.navigate(['/admin/guests/', guest.id]);
  }

  /**
   * Deletes a guest.
   * @param guest The guest to be deleted.
   */
  deleteGuest(guest: Guest) {
    // Confirm the deletion.
    const modal = this.modalService.open(
      GuestModalComponent,
      { centered: true }
    );
    modal.componentInstance.guest = guest;
    modal.result.then(
      (result) => this.guestService.deleteGuest(guest.id),
      () => {}
    );
  }
}
