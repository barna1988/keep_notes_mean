export class Note {
    id: Number;
    title: string;
    text: string;
    state: string;
    userId: string;
    createdOn: Date;
    modifiedOn: Date;
    sharedTo: [string];
    isfavourite: boolean;
    groupName: [string];

    constructor() {
        this.title = '';
        this.text = '';
        this.state = 'not-started';
        this.userId = '';
        this.createdOn = new Date();
        this.modifiedOn = new Date();
        //this.sharedTo = [''];
        this.groupName = [''];
        this.isfavourite = false;

    }
}
