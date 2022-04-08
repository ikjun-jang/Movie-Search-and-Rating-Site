export interface actorDTO{
    id: number;
    name: string;
    dateOfBirth: date;
    picture: string;
    biography: string;
}

export interface actorCreationDTO{
    name: string;
    dateOfBirth?: date;
    picture?: File;
    pictureURL?: string;    
    biography?: string;
}

export interface actorMovieDTO{
    id: number;
    name: string;
    character: string;
    picture: string;
}