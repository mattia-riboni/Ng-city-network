import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  posts: any = [];
  captions: string[] = [];
  imgSrcs: string[] = [];
  first: number = 0;
  last: number = 15;

  constructor(
    private router: Router,
    private postsService: PostsService,
    ){  }

  ngOnInit(): void {

    this.getPosts(this.first, this.last);
    this.iterateCaptions(this.first, this.last);
    this.iteratePostImg(this.first, this.last);

  }


  like(post: { likes: number; }) {
    let liked: boolean = false;
    if (liked){
      post.likes--
      return liked = false;
    } else{
      post.likes++
      return liked = true;
    }
  };

  openComments(){
    this.router.navigateByUrl('global/comments');
  };

  closeBanner(){
    document.querySelector('.banner')?.remove();
  };

  getPosts(start: number, end: number){
    this.postsService.getPublicPosts().subscribe(arr => {
      for (let i = start; i < end; i++) {
        this.posts.push(arr[i]);
      }
    });
  };

iterateCaptions(start: number, end:number){
  for (let i = start; i < end; i++){
    this.postsService.getCaption().subscribe(caption => {
        this.captions.push(caption);
        console.log(this.captions);
    });
  }
};
 iteratePostImg(start: number, end: number){
    for (let i = start; i < end; i++){
      let imgSrc: string = `https://picsum.photos/5${i + 10}/300`;
      this.imgSrcs.push(imgSrc);
    }
 }

 loadMore(){
  this.first = this.first + 10;
  this.last = this.last + 10;
  this.getPosts(this.first, this.last);
  this.iterateCaptions(this.first, this.last);
  this.iteratePostImg(this.first, this.last);
 }

}
