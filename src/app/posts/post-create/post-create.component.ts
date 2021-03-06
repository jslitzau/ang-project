import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';
import { SnacksService } from '../snacks.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  constructor(public postsService: PostsService, public snacksService: SnacksService) {}

  onAddPost(form: NgForm) {
    this.postsService.addPost(form.value.title, form.value.content);
    this.snacksService.showSnacks('Post added!');
    form.resetForm();
  }
}
