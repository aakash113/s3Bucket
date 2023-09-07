import { UserService } from './user.service';
import { User } from "./user.model";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(data: Partial<User>): Promise<User>;
}
