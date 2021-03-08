// App.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Styles.
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// App components.
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent} from './main/main.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Guest components.
import { GuestListComponent } from './admin/guests/guest-list/guest-list.component';
import { GuestFormComponent } from './admin/guests/guest-form/guest-form.component';
import { GuestModalComponent } from './admin/guests/guest-modal/guest-modal.component';
import { GuestEditComponent } from './admin/guests/guest-edit/guest-edit.component';
import { GuestNewComponent } from './admin/guests/guest-new/guest-new.component';

// Result components.
import { ResultsListComponent } from './see-results/results-list/results-list.component';
import { QuestionResultsListComponent } from './see-results/question-results-list/question-results-list.component';

// Image components.
import { ImageListComponent } from './admin/images/image-list/image-list.component';
import { ImageComponent } from './admin/images/image/image.component';
import { ImageFormComponent } from './admin/images/image-form/image-form.component';
import { ImageEditComponent } from './admin/images/image-edit/image-edit.component';
import { ImageNewComponent } from './admin/images/image-new/image-new.component';
import { ImageModalComponent } from './admin/images/image-modal/image-modal.component';

// Theme components.
import { ThemeListComponent } from './admin/themes/theme-list/theme-list.component';
import { ThemeEditComponent } from './admin/themes/theme-edit/theme-edit.component';
import { ThemeModalComponent } from './admin/themes/theme-modal/theme-modal.component';
import { ThemeNewComponent } from './admin/themes/theme-new/theme-new.component';
import { ThemeComponent } from './admin/themes/theme/theme.component';
import { ThemeFormComponent } from './admin/themes/theme-form/theme-form.component';
import { ImageSelectComponent } from './admin/images/image-select/image-select.component';

// Quiz components.
import { QuizListComponent } from './admin/quizzes/quiz-list/quiz-list.component';
import { QuizEditComponent } from './admin/quizzes/quiz-edit/quiz-edit.component';
import { QuizModalComponent } from './admin/quizzes/quiz-modal/quiz-modal.component';
import { QuizFormComponent } from './admin/quizzes/quiz-form/quiz-form.component';
import { QuizNewComponent } from './admin/quizzes/quiz-new/quiz-new.component';
import { QuizComponent } from './admin/quizzes/quiz/quiz.component';

// Question components.
import { QuestionListComponent } from './admin/quizzes/questions/question-list/question-list.component';
import { QuestionComponent } from './admin/quizzes/questions/question/question.component';
import { QuestionModalComponent } from './admin/quizzes/questions/question-modal/question-modal.component';
import { QuestionFormComponent } from './admin/quizzes/questions/question-form/question-form.component';
import { QuestionNewComponent } from './admin/quizzes/questions/question-new/question-new.component';
import { QuestionEditComponent } from './admin/quizzes/questions/question-edit/question-edit.component';

// Play components.
import { GuestSelectionComponent } from './play/guest-selection/guest-selection.component';
import { ThemesSelectionComponent} from './play/themes-selection/themes-selection.component';
import { QuizSelectionComponent} from './play/quiz-selection/quiz-selection.component';
import { QuestionsComponent } from './play/questions/questions.component';
import { PlayQuizComponent } from './play/play-quiz/play-quiz.component';
import { UngroupedResultsListComponent } from './see-results/results-list/ungrouped-results-list/ungrouped-results-list.component';
import { GroupedResultsListComponent } from './see-results/results-list/grouped-results-list/grouped-results-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,

    GuestListComponent,
    GuestFormComponent,
    GuestModalComponent,
    GuestEditComponent,
    GuestNewComponent,

    ImageListComponent,
    ImageComponent,
    ImageFormComponent,
    ImageEditComponent,
    ImageNewComponent,
    ImageModalComponent,
    ImageSelectComponent,

    ThemeListComponent,
    ThemeComponent,
    ThemeFormComponent,
    ThemeEditComponent,
    ThemeModalComponent,
    ThemeNewComponent,

    QuizListComponent,
    QuizComponent,
    QuizModalComponent,
    QuizFormComponent,
    QuizNewComponent,
    QuizEditComponent,

    QuestionListComponent,
    QuestionComponent,
    QuestionModalComponent,
    QuestionFormComponent,
    QuestionNewComponent,
    QuestionEditComponent,

    GuestSelectionComponent,
    ThemesSelectionComponent,
    QuizSelectionComponent,
    PlayQuizComponent,
    QuestionsComponent,

    ResultsListComponent,
    QuestionResultsListComponent,
    UngroupedResultsListComponent,
    GroupedResultsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
