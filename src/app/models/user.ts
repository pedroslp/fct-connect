export interface Roles {
    company?: boolean 
}

export interface UserInterface {
    id?: string
    name?: string
    email?: string
    password?: string
    photoUrl?: string
    roles: Roles
}