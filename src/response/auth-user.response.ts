export class AuthUserResponse {
    private id: string
    private firstname: string
    private lastname: string
    private registrationDate: string
    private accessToken: string

    setId(id: string): this {
        this.id = id

        return this;
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
}
