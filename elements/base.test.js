import BaseElement from './base'
import VM from '../vm-raw'

jest.mock('../vm-raw', () => {
    return {
        registerFunction: jest.fn()
    }
});

describe('base element', () => {

    test('initialize element', () => {

        const base = new BaseElement(
            {
                key: "value"
            },
            [
                "my child"
            ]
        );

        expect(base.props.key).toBe("value");
        expect(base.children[0]).toBe("my child");

    });

    test('test to json', () => {

        const eventHandler = () => {};

        // mock VM register function
        VM.registerFunction.mockImplementation((fn) => {

            expect(fn).toBe(eventHandler);

            return 45

        });

        class ViewMock extends BaseElement{
            get type(){ return "ViewMock" }
        }

        class TextMock extends BaseElement{
            get type(){ return "TextMock" }
        }

        const ui = new ViewMock(
            {
                onEvent: eventHandler
            },
            [
                new TextMock(
                    {},
                    ["salve"]
                ),
                new TextMock(
                    {},
                    ["consavis"]
                ),
            ]
        ).toJSON();

        // make sure type is as expected
        expect(ui.type).toBe("ViewMock");

        // an callback should be replaced by a reference
        // this reference will be used by the VM to call that function
        expect(ui.props.onEvent).toBe(45);

        expect(ui.children[0].props).toEqual({});
        expect(ui.children[0].children).toEqual(["salve"]);

        expect(ui.children[1].props).toEqual({});
        expect(ui.children[1].children).toEqual(["consavis"]);

    })

});
