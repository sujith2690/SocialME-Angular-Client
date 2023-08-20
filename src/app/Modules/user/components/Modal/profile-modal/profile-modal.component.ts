// import { Component, Input } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { searchUser } from 'src/app/Core/Models/searchuser';
// import { UserDataService } from 'src/app/Core/Services/User/user-data.service';



// @Component({
//   selector: 'app-profile-modal',
//   templateUrl: './profile-modal.component.html',
//   styleUrls: ['./profile-modal.component.css']
// })
// export class ProfileModalComponent {
//   @Input() handleEdit: () => void = () => { };
//   user: searchUser = {
//     allPosts: [],
//     firstname: '',
//     followers: [],
//     following: [],
//     lastname: '',
//     username: '',
//     _id: '',
//     country: '',
//     coverPicture: '',
//     livesIn: '',
//     profilePicture: '',
//     relationship: '',
//     worksAt: '',
//   };
//   constructor(private fb: FormBuilder,
//     private router: ActivatedRoute,
//     private userData: UserDataService,) { }
//   ngOnInit() {
//     let getParamId = this.router.snapshot.paramMap.get('id') || ''; // Provide a default value here
//     this.getUser(getParamId);
//   }

//   profileUpdate = this.fb.group({
//     firstname: ['', Validators.required],
//     lastname: ['', Validators.required],
//     profileImage: [''], // No validators specified for file inputs
//     coverImage: ['']    // No validators specified for file inputs
//   });

//   get f() { return this.profileUpdate.controls; }

//   onSubmit() {
//     if (this.profileUpdate.valid) {
//       const formData = this.profileUpdate.value;
//       console.log(formData, '-------form');
//     }
//   }
//   handleClick() {
//     this.handleEdit()
//   }
//   getUser(userId?: string) {
//     if (userId) {
//       this.userData.getUserData(userId).subscribe((result) => {
//         this.user = result
//         console.log( this.user)
//       })
//     }
//   }
// }


import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { searchUser } from 'src/app/Core/Models/searchuser';
import { UserDataService } from 'src/app/Core/Services/User/user-data.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent implements OnChanges {
  @Input() handleEdit: () => void = () => { };
  @Input() user: searchUser = {  // Assume you're passing user data as an input
    allPosts: [],
    firstname: '',
    followers: [],
    following: [],
    lastname: '',
    username: '',
    _id: '',
    country: '',
    coverPicture: '',
    livesIn: '',
    profilePicture: '',
    relationship: '',
    worksAt: '',
  };

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private userData: UserDataService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.profileUpdate.patchValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        relationship: this.user.relationship,
        livesIn: this.user.livesIn,
        worksAt: this.user.worksAt,
      });
    }
  }

  profileUpdate = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    profileImage: [''],
    coverImage: [''],
    relationship: [''],  // Add this line
    livesIn: [''],       // Add this line
    worksAt: ['']        // Add this line
  });

  get f() {
    return this.profileUpdate.controls;
  }

  onSubmit() {
    if (this.profileUpdate.valid) {
      const formData = this.profileUpdate.value;
      console.log(formData, '-------form');
    }
  }

  handleClick() {
    this.handleEdit();
  }

  getUser(userId?: string) {
    if (userId) {
      this.userData.getUserData(userId).subscribe((result) => {
        this.user = result;
        console.log(this.user);
      });
    }
  }
}

