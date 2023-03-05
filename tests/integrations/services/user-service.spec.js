require('dotenv').config()
const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')

const User = require('../../../src/schemas/User')
const UserController = require('../../../src/controllers/user-ctrl')
const { requestMock, requestMockByParam, responseMock } = require('../../mocks/controllers-mocks')

const userDataMock = requestMock.body


describe('[Integration] User Service', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DB_URL)
        await User.create(userDataMock)
    })
    
    afterAll(async () => {
        await User.deleteMany({})
        mongoose.connection.close()
    })
    
    it('Should return 200 and ID if valid data is provided', async () => {
        const res = await UserController.create(requestMock, responseMock)
        expect(res.status).toBe(200)
        console.log(res.data)
        expect(res.data).toHaveProperty('id')
    })

    it('Should return 400 if an invalid email is provided', async () => {
        const res = await UserController.create(requestMockByParam({
            name: faker.name.fullName(),
            email: "invalidMail@mail",
            password: faker.internet.password()
        }), responseMock)

        expect(res.status).toBe(400)
        expect(res.data).toBe('Email inválido')
    })

    it('Should return 400 if password if not provided', async () => {
        const res = await UserController.create(requestMockByParam({
            name: faker.name.fullName(),
            email: faker.internet.email(),
        }), responseMock)

        expect(res.status).toBe(400)
        expect(res.data).toBe('Senha inválida')
    })

})