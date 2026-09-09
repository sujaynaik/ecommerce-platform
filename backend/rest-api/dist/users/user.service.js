const users = [
    {
        id: "1",
        name: "Commerce Admin",
        email: "admin@commerce.com",
        role: "ADMIN",
        status: "ACTIVE",
    },
    {
        id: "2",
        name: "Store Staff",
        email: "staff@commerce.com",
        role: "STAFF",
        status: "ACTIVE",
    },
];
export class UserService {
    getAll() {
        return users;
    }
}
