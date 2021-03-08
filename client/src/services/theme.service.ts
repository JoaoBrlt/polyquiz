// App.
import { Injectable } from '@angular/core';

// Communication.
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// Models and services.
import { Theme } from '../models/theme.model';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends DataService {
  /**
   * The list of themes.
   */
  private themes: Theme[];

  /**
   * The observable list of themes.
   */
  private themes$: BehaviorSubject<Theme[]>;

  /**
   * Constructs the theme service.
   * @param http The HTTP client.
   */
  constructor(private http: HttpClient) {
    super();
    this.themes = [];
    this.themes$ = new BehaviorSubject<Theme[]>(this.themes);
    this.findAllThemes();
  }

  /**
   * Returns the observable list of themes.
   */
  getThemes(): Observable<Theme[]> {
    return this.themes$.asObservable();
  }

  /**
   * Returns an observable theme by id.
   * @param id The id of the theme.
   */
  getTheme(id: number): Observable<Theme> {
    return this.getThemes()
      .pipe(
        map((themes) => themes.find((theme) => theme.id === id))
      );
  }

  /**
   * Finds all the themes.
   */
  findAllThemes() {
    this.http
      .get<Theme[]>(`${this.serverURL}/themes`)
      .subscribe((themes: Theme[]) => {
        this.themes = themes;
        this.themes$.next(this.themes);
      });
  }

  /**
   * Creates a theme.
   * @param name The name of the theme.
   * @param imageId The image id of the theme.
   */
  createTheme(name: string, imageId: number) {
    this.http
      .post<Theme>(
        `${this.serverURL}/themes`,
        {
          name,
          imageId
        },
        this.serverOptions
      )
      .subscribe(() => {
        this.findAllThemes();
      });
  }

  /**
   * Updates a theme.
   * @param id The id of the theme.
   * @param name The name of the theme.
   * @param imageId The image id of the theme.
   */
  updateTheme(id: number, name: string, imageId: number) {
    this.http
      .put<Theme>(
        `${this.serverURL}/themes/${id}`,
        {
          name,
          imageId
        },
        this.serverOptions
      )
      .subscribe(() => {
        this.findAllThemes();
      });
  }

  /**
   * Deletes a theme.
   * @param id The id of the theme.
   */
  deleteTheme(id) {
    this.http
      .delete<Theme>(`${this.serverURL}/themes/${id}`)
      .subscribe(() => {
        this.findAllThemes();
      });
  }
}
