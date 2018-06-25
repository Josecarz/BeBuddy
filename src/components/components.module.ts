import { NgModule } from '@angular/core';
import { CreateTourComponent } from './create-tour/create-tour';
import { CommentsComponent } from './comments/comments';
@NgModule({
	declarations: [
    CreateTourComponent,
    CommentsComponent],
	imports: [],
	exports: [
    CreateTourComponent,
    CommentsComponent]
})
export class ComponentsModule {}
