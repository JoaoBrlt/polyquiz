// App.
import { Component, Input, OnInit} from '@angular/core';

// Styles.
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-guest-modal',
  templateUrl: './guest-modal.component.html',
  styleUrls: ['./guest-modal.component.scss']
})
export class GuestModalComponent implements OnInit {
  /**
   * The guest to be deleted.
   */
  @Input()
  public guest;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
