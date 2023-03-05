const jwt = require('jsonwebtoken')


const {authorizationMock, responseMock} = require("../../mocks/controllers-mocks")
const auth = require("../../../src/middlewares/auth")
let next = jest.fn();

describe("[Unit] authorization middleware ", () => {

    it("Should return 401 if the Token is not provided", async() =>{
        const result = await auth(authorizationMock(""), responseMock, next )
        expect(result.status).toBe(401)
        expect(result.data.message).toBe('Token is not provided')
    })

    it("Should allow to Proceed if token is valid", async() =>{
        let spy = jest.spyOn(jwt, 'verify').mockImplementationOnce(() => ({email: 'email@mail.com'}))
        const result = await auth(authorizationMock("token"), responseMock, next )
        expect(spy).toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })

    it("Should return 401 if the Email is not provided", async() =>{
        const result = await auth(authorizationMock("token"), responseMock, next )
        expect(result.status).toBe(401)
    })
   
})

