import Text from './text'

describe('text element', () => {

    test('check the type', () => {

        const t = new Text();

        expect(t.type).toBe('Text')

    })

});
