import { NgModule } from '@angular/core';
import { CreateTourComponent } from './create-tour/create-tour';
import { CommentsComponent } from './comments/comments';
import { LoadDataComponent } from './load-data/load-data';
import { TourComponent } from './tour/tour';
import { TourCarrouselComponent } from './tour-carrousel/tour-carrousel';
@NgModule({
	declarations: [
    CreateTourComponent,
    CommentsComponent,
    LoadDataComponent,
    TourComponent,
    TourCarrouselComponent],
	imports: [],
	exports: [
    CreateTourComponent,
    CommentsComponent,
    LoadDataComponent,
    TourComponent,
    TourCarrouselComponent]
})
export class ComponentsModule {}
