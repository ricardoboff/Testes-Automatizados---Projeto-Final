const UserController = require("../../../src/controllers/user-ctrl")
const UserService = require('../../../src/services/user-service')

const {
    requestMock, 
    requestMockWithoutEmail, 
    requestMockWithoutPassword, 
    responseMock
} = require('../../mocks/controllers-mocks')

const UserServiceMock = class UserServiceMock {
    static async createUser() {
        return { id: 1 }
    }

}

describe('[Unit] User Controller', () => {
    it('Should return an ID if a User is created', async () => {
        jest.spyOn(UserService, 'createUser').mockImplementationOnce(UserServiceMock.createUser)
        
        const res = await UserController.create(requestMock, responseMock)
        expect(res.data).toHaveProperty('id')
    })

    it('Should return 400 if the password is not provided', async () => {
        jest.spyOn(UserService, 'createUser').mockImplementationOnce(UserServiceMock.createUser)
    
        const res = await UserController.create(requestMockWithoutPassword, responseMock)
       
        expect(res.status).toBe(400)        
    })

    it('Should return 400 if the email is not provided', async () => {
        jest.spyOn(UserService, 'createUser').mockImplementationOnce(UserServiceMock.createUser)
    
        const res = await UserController.create(requestMockWithoutEmail, responseMock)
       
        expect(res.status).toBe(400)
    })

    it('Should return 400 if the email is not provided', async () => {
        jest.spyOn(UserService, 'createUser').mockImplementationOnce(UserServiceMock.createUser)
    
        const res = await UserController.create(requestMockWithoutEmail, responseMock)
       
        expect(res.status).toBe(400)
    })

    it('Should return 200 if the Password Change is OK', async () => {
        jest.spyOn(UserService, 'createUser').mockImplementationOnce(UserServiceMock.createUser)
    
        const res = await UserController.changePassword(requestMockWithoutEmail, responseMock)
       
        expect(res.status).toBe(200)
    })

    it('Should return 500 if there is an error when creating a user', async () => {
        jest.spyOn(UserService, 'createUser').mockImplementationOnce(UserServiceMock.createUser)
        
        const res = await UserController.create("",responseMock)
        expect(res.status).toBe(500)
    })
  
})