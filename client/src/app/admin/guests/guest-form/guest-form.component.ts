// App.
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Models and services.
import { Guest } from '../../../../models/guest.model';
import { GuestService } from '../../../../services/guest.service';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss']
})
export class GuestFormComponent implements OnInit {
  /**
   * The guest to be displayed.
   */
  @Input()
  public guest: Guest;

  /**
   * The event emitter to submit the guest.
   */
  @Output()
  public submitGuest: EventEmitter<Guest> = new EventEmitter<Guest>();

  /**
   * The form group of the guest.
   */
  public guestForm: FormGroup;

  /**
   * The available accessibility profiles.
   */
  public accessibilities: object[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private guestService: GuestService
  ) {
    // Create the form group.
    this.guestForm = this.formBuilder
      .group({
        id: [{ value: 0, disabled: true }],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        accessibility: ['none', Validators.required]
      });

    // Get the accessibilities.
    this.accessibilities = this.guestService.getAccessibilities();
  }

  ngOnInit() {
    // Input the guest values.
    if (this.guest) {
      this.guestForm.setValue({
        id: this.guest.id,
        firstName: this.guest.firstName,
        lastName: this.guest.lastName,
        accessibility: this.guest.accessibility
      });
    }
  }

  /**
   * Submits the guest.
   */
  submit() {
    const guest: Guest = this.guestForm.getRawValue() as Guest;
    this.submitGuest.emit(guest);
  }
}
