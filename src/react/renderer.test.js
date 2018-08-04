import {renderMessage} from './renderer'
import React from 'react'
import {Message} from './dAppComponent'

describe('renderer', () => {

    describe('message rendering', () => {

        test('render "empty" component', (done) => {

            class SentMoneyMessage extends Message {
                render(){
                    return (null)
                }
            }

            renderMessage(<SentMoneyMessage  />, (jsx) => {
                expect(jsx).toEqual({});
                done();
            })

        });

        test('render nested component', (done) => {

            const View = "View";
            const Text = "Text";
            const Button = "Button";

            class SentMoneyMessage extends Message {
                render(){
                    return (
                        <View>
                            <Text>To: "0x30321931e6a786895e85d439b34be74bd4bb7a46"</Text>
                            <Text>Amount: 3 ETH</Text>
                            <View>
                                <Button url={"https://etherscan.io/tx/0xfa2357259e212a941acf124bc34f4e392e35db7b5002e38f8a9d420f93a9448f"}>Go to etherscan</Button>
                            </View>
                        </View>
                    )
                }
            }

            renderMessage(<SentMoneyMessage  />, (jsx) => {

                const expectedJsonTree = {
                    type: "View",
                    props: {},
                    children: [
                        {
                            type: "Text",
                            props: {},
                            children: 'To: "0x30321931e6a786895e85d439b34be74bd4bb7a46"'
                        },
                        {
                            type: "Text",
                            props: {},
                            children: 'Amount: 3 ETH'
                        },
                        {
                            type: "View",
                            props: {},
                            children: [
                                {
                                    type: "Button",
                                    props: {
                                        url: "https://etherscan.io/tx/0xfa2357259e212a941acf124bc34f4e392e35db7b5002e38f8a9d420f93a9448f"
                                    },
                                    children: "Go to etherscan"
                                }
                            ]
                        }
                    ]
                };

                expect(jsx).toEqual(expectedJsonTree);

                done();
            })

        })

    })

});
