export declare type creatorModel = [
    {
        Mode : 'LIST' | 'CREATE' | 'EDIT' | 'VIEW';
    }
]

export class createUser{
    name: string = '';
    username: string = '';
    pass: string = '';
    mobile: string = '';
    role: string = '';
    subjects: string = '';
}