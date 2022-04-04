enum ROLES {
    'ADMIN',
    'USER',
}

export class User {
    constructor(
        public email: string,
        public password: string,
        public role?: ROLES,
    ) {}
}