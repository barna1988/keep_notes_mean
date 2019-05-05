export class Note {
    id: Number;
    title: string;
    text: string;
    state: string;
    userId: string;
    createdOn: Date;
    modifiedOn: Date;
    sharedTo: [string];
    isFavourite: boolean;
    groupName: [string];
    checked : boolean;

    constructor() {
        this.title = '';
        this.text = '';
        this.state = 'not-started';
        this.userId = '';
        this.createdOn = new Date();
        this.modifiedOn = new Date();
        this.sharedTo = null;
        this.groupName = null;
        this.isFavourite = false;
        this.checked = false;
    }
}
