// App.
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Models and services.
import { Image } from '../../../../models/image.model';
import { ImageService } from '../../../../services/image.service';

@Component({
  selector: 'app-image-new',
  templateUrl: './image-new.component.html',
  styleUrls: ['./image-new.component.scss'],
})
export class ImageNewComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
  ) {}

  ngOnInit() {}

  /**
   * Creates the image.
   * @param image The image to be created.
   */
  createImage(image: Image) {
    this.imageService.createImage(
      image.name,
      image.path
    );
    this.router.navigate(['/admin/images']);
  }
}
