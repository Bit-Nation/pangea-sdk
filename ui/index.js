/**
 * @desc Render UI to json representation
 * @param element
 * @returns {*|{type, props, children}|any|string}
 */
export function render(element) {
    return element.toJSON()
}

export const UIElements = {
    get View() { return require("./view"); },
    get Text() { return require("./text"); },
};
