const dotenv = require("dotenv")
const SessionService = require("../../../src/services/session-service")
dotenv.config()


describe('[Unit] User Service', () => {
    it("Should return an Token when receiving valid emai",async() => {
        const result = await SessionService.generateToken({email: 'abc@gmail.com'})
        let tokenRegex = new RegExp(/^[A-Za-z0-9-=]+.[A-Za-z0-9-=]+.?[A-Za-z0-9-_.+/=]*$/)

        expect(result).toMatch(tokenRegex)
    })
})