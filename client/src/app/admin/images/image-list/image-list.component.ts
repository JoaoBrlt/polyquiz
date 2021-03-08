// App.
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

// Styles.
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Models and services.
import { Image} from '../../../../models/image.model';
import { ImageService} from '../../../../services/image.service';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
})
export class ImageListComponent implements OnInit {
  /**
   * The list of images.
   */
  public images: Image[];

  /**
   * The variables of the pagination.
   */
  public page ;
  public pageSize;
  public collectionSize;

  /**
   * The button icons.
   */
  public createIcon = faPlus;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private imageService: ImageService
  ) {
    this.page = 1;
    this.pageSize = 6;
    this.collectionSize = 0;
  }

  ngOnInit(): void {
    // Get the images.
    this.imageService
      .getImages()
      .subscribe((images: Image[]) => {
        this.images = images;
        this.collectionSize = images.length;
      });
  }

  /**
   * Returns a slice of the images.
   */
  getImages(): Image[] {
    return this.images
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  /**
   * Creates an image.
   */
  createImage() {
    this.router.navigate(['/admin/images/new']);
  }

  /**
   * Edits an image.
   */
  editImage(image: Image) {
    this.router.navigate(['/admin/images/', image.id]);
  }

  /**
   * Deletes an image.
   * @param image The image to be deleted.
   */
  deleteImage(image: Image) {
    // Confirm the deletion.
    const modal = this.modalService.open(
      ImageModalComponent,
      { centered: true }
    );
    modal.componentInstance.image = image;
    modal.result.then(
      (result) => this.imageService.deleteImage(image.id),
      () => {}
    );
  }
}
