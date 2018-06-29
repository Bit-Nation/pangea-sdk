/**
 * @desc Render UI to json representation
 * @param element
 * @returns {Object} the rendered layout as a string
 */
export function render(element) {
    return JSON.stringify(element.toJSON())
}

export const UIElements = {
    get View() { return require("./view"); },
    get Text() { return require("./text"); },
};
