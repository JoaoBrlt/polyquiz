// App.
import { Component, Input, OnInit} from '@angular/core';

// Styles.
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// Models.
import { Image } from '../../../../models/image.model';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
  /**
   * The image to be deleted.
   */
  @Input()
  public image: Image;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}
}
