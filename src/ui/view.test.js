import View from './view'

describe('view element', () => {

    test('check the type', () => {

        const v = new View();

        expect(v.type).toBe('View')

    })

});
