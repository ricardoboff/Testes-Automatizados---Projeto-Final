const Email = require('../../../src/utils/email-validator')

describe('[Unit] Email Validator', () => {
    it('Should return True if a valid Email is provided', () => {
        const isValid = Email.isValid('any_email@adatech.com')

        expect(isValid).toBe(true)
    })

    it('Should return False if an invalid Email is provided', () => {
        const isValid = Email.isValid('any_emailadatech.com')

        expect(isValid).toBe(false)
    })

    it('Should return False if an invalid Email without domain is provided', () => {
        const isValid = Email.isValid('any_emailad@atech')

        expect(isValid).toBe(false)
    })
})