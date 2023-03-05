const UserService = require('../../../src/services/user-service')
const User = require('../../../src/schemas/User')
const userMock =require("../../mocks/user-mock")

const createdUserMock = () => ({ id: 1 })


describe('[Unit] User Service', () => {
    it('Should return an ID for created users', async () => {
        jest.spyOn(User, 'create').mockImplementationOnce(createdUserMock)
        
        const created = await UserService.createUser({
            email: 'any_email@mail.com',
            name: 'Any Name',
            password: '123456'
        })

        expect(created).toHaveProperty('id')
    })

    it('Should return False if the User is not Registered', async () => {
        const spy = jest.spyOn(User, 'findOne').mockImplementationOnce(()=>false)
        
        const result = await UserService.userExistsAndCheckPassword({
            email: 'any_email@mail.com',
            password: '123456'
        })

        expect(spy).toHaveBeenCalled()
        expect(result).toBe(false)
    })

    it('Should return 400 if the Password does not Match', async () => {
        const spy = jest.spyOn(User, 'findOne').mockImplementationOnce(()=>userMock)
        
        try {
            const result = await UserService.userExistsAndCheckPassword({
                email: 'any_email@mail.com',
                password: '123456'
            })
        } catch (error) {
            expect(spy).toHaveBeenCalled()
            expect(error.status).toBe(400)
            expect(error.message).toBe('As senhas não batem')
        }
    })

    it('Should return True if Username and Password are OK', async () => {
        const spy = jest.spyOn(User, 'findOne').mockImplementationOnce(()=>userMock)
        
        const result = await UserService.userExistsAndCheckPassword(userMock)

        expect(spy).toHaveBeenCalled()
        expect(result).toBe(true)
    })
})