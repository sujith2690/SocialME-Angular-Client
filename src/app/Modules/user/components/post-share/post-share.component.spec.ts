import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostShareComponent } from './post-share.component';

describe('PostShareComponent', () => {
  let component: PostShareComponent;
  let fixture: ComponentFixture<PostShareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostShareComponent]
    });
    fixture = TestBed.createComponent(PostShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
