export class ResponseOrganizer {
    public statusCode? = 200
    private message: string
    private data?: any

    setStatusCode(code: number): this {
        this.statusCode = code
        return this
    }

    setMessage(message: string): this {
        this.message = message
        return this
    }

    setData(data: any): this {
        this.data = data
        return this
    }
}