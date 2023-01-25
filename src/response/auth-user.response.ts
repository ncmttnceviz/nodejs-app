export class AuthUserResponse {
    private id: string
    private firstname: string
    private lastname: string
    private registrationDate: string
    private accessToken: string
    private lastFailLogin: string | null

    setId(id: string): this {
        this.id = id

        return this;
    }

    getId(): string {
        return this.id
    }

    setFirstName(firstName: string): this {
        this.firstname = firstName;

        return this;
    }

    setLastName(lastName: string): this {
        this.lastname = lastName;

        return this;
    }

    setRegistrationDate(registrationDate: string): this {
        this.registrationDate = registrationDate.toString()

        return this;
    }

    setAccessToken(token: string): this {
        this.accessToken = token;

        return this;
    }

    setLastFailLogin(date: string | null): this {
        this.lastFailLogin = date

        return this;
    }
}
