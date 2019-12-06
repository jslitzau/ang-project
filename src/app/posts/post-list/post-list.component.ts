import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { SnacksService } from '../snacks.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  emotionCtrl = new FormControl();
  filteredEmotions: Observable<string[]>;
  emotions: string[] = [];
  allEmotions: string[] = ['Happy', 'Sad', 'Angry', 'Annoyed', 'Relieved', 'Excited', 'Calm', 'Scared'];
  posts: Post[] = [];

  @ViewChild('emotionInput', {static: false}) emotionInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  constructor(public postsService: PostsService, public snacksService: SnacksService) {
    this.filteredEmotions = this.emotionCtrl.valueChanges.pipe(
      startWith(null),
      map((emotion: string | null) => emotion ? this._filter(emotion) : this.allEmotions.slice()));
  }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
  }

  onDelete(index: number) {
    this.postsService.deletePost(index);
    this.snacksService.showSnacks('Post deleted!');
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.emotions.push(value.trim());
      }

      if (input) {
        input.value = '';
      }

      this.emotionCtrl.setValue(null);
    }
  }

  remove(emotion: string): void {
    const index = this.emotions.indexOf(emotion);

    if (index >= 0) {
      this.emotions.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.emotions.push(event.option.viewValue);
    this.emotionInput.nativeElement.value = '';
    this.emotionCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allEmotions.filter(emotion => emotion.toLowerCase().indexOf(filterValue) === 0);
  }
}
