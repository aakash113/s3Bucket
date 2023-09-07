import { User } from './user.model';
export declare class UserService {
    private userModel;
    constructor(userModel: typeof User);
    createUser(data: Partial<User>): Promise<User>;
}
