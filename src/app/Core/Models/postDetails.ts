export interface postDetails {
    'name': string,
    'file': File,
}
export interface post {
    userId: string,
    desc: string,
    image?: string
}
export interface savedPost{
    comments:[],
    desc:string,
    isremoved:boolean,
    firstname:string,
    image:string,
    lastname:string,
    liked:boolean,
    likedNumber:number,
    likes:[],
    profilePicture:string,
    savedusers:[],
    userId:string,
    _id:string
}