import React from 'react';
import Reconciler from 'react-reconciler';
import reconcilerConfig from './reconcilerConfig'
import Container from '../pangea/elements/container'

const PangeRenderer = Reconciler(reconcilerConfig);

export const ReactTinyDOM = {
    render(element, callback) {

        const c = new Container();

        const node = PangeRenderer.createContainer(c);

        return PangeRenderer.updateContainer(
            element,
            node,
            null,
            () => {
                callback(c.toJSON())
            }
        );

    },
};
