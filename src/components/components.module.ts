import { NgModule } from '@angular/core';
import { CreateTourComponent } from './create-tour/create-tour';
import { CommentsComponent } from './comments/comments';
import { LoadDataComponent } from './load-data/load-data';
import { TourComponent } from './tour/tour';
@NgModule({
	declarations: [
    CreateTourComponent,
    CommentsComponent,
    LoadDataComponent,
    TourComponent],
	imports: [],
	exports: [
    CreateTourComponent,
    CommentsComponent,
    LoadDataComponent,
    TourComponent]
})
export class ComponentsModule {}
