import { HttpException, HttpStatus } from '@nestjs/common'

export class ValidationExeption extends HttpException {
    messages: String[]
    constructor(responseMessages: String[]) {
        super(responseMessages, HttpStatus.BAD_REQUEST)
        this.messages = responseMessages
    }
}
