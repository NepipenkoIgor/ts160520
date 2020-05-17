import { SavePersistence } from './utils';


class UserAccount {
    public firstName!: string;

    @SavePersistence
    public lastName!: string;
}

let user = new UserAccount();

console.log(user.lastName);
user.lastName = 'Nepipenko';
