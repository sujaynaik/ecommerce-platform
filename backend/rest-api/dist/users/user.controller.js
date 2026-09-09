import { UserService } from "./user.service.js";
export class UserController {
    service;
    constructor(service = new UserService()) {
        this.service = service;
    }
    getAll(_req, res) {
        res.json(this.service.getAll());
    }
}
