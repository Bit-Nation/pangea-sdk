import BaseElement from './base'
import VM from '../vm'

jest.mock('../vm', () => {
    return {
        registerFunction: jest.fn()
    }
});

describe('base element', () => {

    test('initialize element', () => {

        const base = new BaseElement("View");

        expect(base.type).toBe("View");

    });

    test('test to json', () => {

        const eventHandler = () => {};

        // mock VM register function
        VM.registerFunction.mockImplementation((fn) => {

            expect(fn).toBe(eventHandler);

            return 45

        });

        const child = new BaseElement("Text");

        const ui = new BaseElement("TouchableElement");
        ui.props = {
            onEvent: eventHandler
        };
        ui.children = [
            child
        ];

        const jsonTree = ui.toJson();

        expect(jsonTree.type).toEqual("TouchableElement");
        expect(jsonTree.props.onEvent).toBe(45);
        expect(jsonTree.children[0]).toEqual(child);

    })

});
