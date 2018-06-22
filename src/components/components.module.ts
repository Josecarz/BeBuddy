import { NgModule } from '@angular/core';
import { CommentsComponent } from './comments/comments';
import { CreateTourComponent } from './create-tour/create-tour';
@NgModule({
	declarations: [CommentsComponent,
    CreateTourComponent],
	imports: [],
	exports: [CommentsComponent,
    CreateTourComponent]
})
export class ComponentsModule {}
