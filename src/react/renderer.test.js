import {renderMessage, renderModal} from './renderer'
import React from 'react'
import {Message, Modal} from './dAppComponent'
import VM from "../vm";
import Container from "./container";

jest.mock('../vm', () => {
    return {
        renderModal: jest.fn(),
        registerFunction: jest.fn(),
    }
});

describe('renderer', () => {

    describe('message rendering', () => {

        test('render "empty" component', (done) => {

            class SentMoneyMessage extends Message {
                render(){
                    return (null)
                }
            }

            renderMessage(<SentMoneyMessage  />, (jsx) => {
                expect(jsx).toEqual({
                    props: {},
                    children: []
                });
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

            renderMessage(<SentMoneyMessage />, (jsx) => {
                const expectedJsonTree = {
                    props: {},
                    children: [{
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
                    }]
                };

                expect(jsx).toEqual(expectedJsonTree);

                done();
            })

        });

    });

    describe("modal rendering", () => {

        test('state mutation', (done) => {

            let call = 0;
            VM.renderModal.mockImplementation((uiID, jsxTree, cb) => {

                // assertion on initial rendering
                if (call === 0){
                    expect(uiID).toBe("ui-id");
                    expect(jsxTree).toEqual(JSON.stringify({
                        props: {},
                        children: [
                            {
                                type: "View",
                                props: {},
                                children: [
                                  {
                                    type: "View",
                                    props: {},
                                    children: [
                                      {
                                        type: "Text",
                                        props: {},
                                        children: "hi"
                                      }
                                    ]
                                  }
                                ]
                            }
                        ]
                    }));
                    call++;
                    return cb()
                }

                // assertion on re render
                if (call === 1){
                    expect(uiID).toBe("ui-id");
                    expect(jsxTree).toEqual(JSON.stringify({
                      props: {},
                      children: [
                        {
                          type: "View",
                          props: {},
                          children: [
                            {
                              type: "View",
                              props: {},
                              children: [
                                {
                                  type: "Text",
                                  props: {},
                                  children: "Hi"
                                },
                                {
                                  type: "Text",
                                  props: {},
                                  children: "there"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }));
                    call++;
                    return cb();
                }

                throw new Error("unexpected case")
            });

            const Text = "Text";
            const View = "View";

            class MyModal extends Modal {
                constructor(props){
                    super(props);
                    this.state = {
                        text: [
                            <Text>hi</Text>
                        ]
                    }
                }
                componentDidMount(){
                    setTimeout(() => {
                        this.setState({text: [<Text>Hi</Text>, <Text>there</Text>]}, () => {
                            done();
                        })
                    }, 100)
                }
                render(){
                    return (
                      <View>
                        <View>
                          {this.state.text}
                        </View>
                    </View>
                    )
                }
            }

            renderModal(<MyModal modalContainer={new Container("ui-id")}/>, () => {})

        });

      test('state mutation with props changing that going to text children', (done) => {

        let call = 0;
        VM.renderModal.mockImplementation((uiID, jsxTree, cb) => {

          // assertion on initial rendering
          if (call === 0){
            expect(uiID).toBe("ui-id");
            expect(jsxTree).toEqual(JSON.stringify({
              props: {},
              children: [
                {
                  type: "View",
                  props: {},
                  children: [
                    {
                      type: "Text",
                      props: { color: 'old' },
                      children: "old"
                    },
                    {
                      type: "Text",
                      props: { valueToBecomeUndefined: 'defined' },
                      children: "defined"
                    }
                  ]
                }
              ]
            }));
            call++;
            return cb()
          }

          // assertion on re render
          if (call === 1){
            expect(uiID).toBe("ui-id");
            expect(jsxTree).toEqual(JSON.stringify({
              props: {},
              children: [
                {
                  type: "View",
                  props: {},
                  children: [
                    {
                      type: "Text",
                      props: { color: 'new' },
                      children: "new"
                    },
                    {
                      type: "Text",
                      props: { valueToBecomeUndefined: undefined },
                      children: undefined,
                    }
                  ]
                }
              ]
            }));
            call++;
            return cb();
          }

          throw new Error("unexpected case")
        });

        const Text = "Text";
        const View = "View";

        class MyModal extends Modal {
          constructor(props){
            super(props);
            this.state = {
              color: 'old',
              valueToBecomeUndefined: 'defined'
            }
          }
          componentDidMount(){
            setTimeout(() => {
              this.setState({
                color: 'new',
                valueToBecomeUndefined: undefined
              }, () => {
                done();
              })
            }, 100)
          }
          render(){
            return (
              <View>
                <Text color={this.state.color}>
                  {this.state.color}
                </Text>
                <Text valueToBecomeUndefined={this.state.valueToBecomeUndefined}>
                  {this.state.valueToBecomeUndefined}
                </Text>
              </View>
            )
          }
        }

        renderModal(<MyModal modalContainer={new Container("ui-id")}/>, () => {})

      });

        test("success", (done) => {

            const Text = "Text";
            const View = "View";

            class SendMoneyModal extends Modal {
                constructor(props){
                    super(props);
                    this.state = {
                        elements: [],
                        called: 0
                    };

                    // mock VM register function
                    const testView = (
                        <View>
                            <Text>B</Text>
                        </View>
                    );
                    VM.renderModal.mockImplementation((uiID, jsxTree, cb) => {

                        if (this.state.called === 0){
                            expect(jsxTree).toEqual(JSON.stringify({
                                props: {
                                    title: "my title"
                                },
                                children: []
                            }));

                            this.state.elements.push(<Text>A</Text>);
                            this.state.called = 1;
                            return this.setState(this.state, cb);
                        }

                        if (this.state.called === 1){
                            expect(jsxTree).toEqual(JSON.stringify({
                                props: {
                                    title: "my title"
                                },
                                children: [
                                    {
                                        type: "Text",
                                        props: {},
                                        children: "A"
                                    }
                                ]
                            }));

                            this.state.elements.push(testView);
                            this.state.called = 2;
                            return this.setState(this.state, cb);
                        }

                        if (this.state.called === 2){
                            expect(jsxTree).toEqual(JSON.stringify({
                                props: {
                                    title: "my title"
                                },
                                children: [
                                    {
                                        type: "Text",
                                        props: {},
                                        children: "A",
                                    },
                                    {
                                        type: "View",
                                        props: {},
                                        children: [
                                            {
                                                type: "Text",
                                                props: {},
                                                children: "B"
                                            }
                                        ]
                                    }
                                ]
                            }));

                            this.state.elements = this.state.elements.filter((e) => e !== testView)
                            this.state.called = 3;
                            return this.setState(this.state, cb);
                        }

                        if (this.state.called === 3){
                            expect(jsxTree).toEqual(JSON.stringify({
                                props: {
                                    title: "my title"
                                },
                                children: [
                                    {
                                        type: "Text",
                                        props: {},
                                        children: "A"
                                    }
                                ]
                            }));
                            return done();
                        }

                        done.fail("failed to handle state")
                    });

                }
                render(){
                    return (this.state.elements)
                }
            }

            renderModal(<SendMoneyModal title="my title" modalContainer={new Container("modal-ui-id")} />, () => {})

        });

        test('only one element', (done) => {

            VM.renderModal.mockImplementation((uiID, jsxTree, cb) => {
                expect(uiID).toBe("our-ui-id");
                expect(jsxTree).toBe(JSON.stringify({"props":{"title":"my title"},"children":[{"type":"Text","props":{},"children":"Hi there"}]}));
                cb();
            });

            const Text = "Text";

            class DemoModal extends Modal {
                render(){
                    return (
                        <Text>Hi there</Text>
                    )
                }
            }

            renderModal(<DemoModal title={"my title"} modalContainer={new Container("our-ui-id")}/>, () => {
                done()
            })

        });

        test('render function', (done) => {

            const expectedJsonTree = {
                "props":{},
                "children":[
                    {
                        "type":"Button",
                        "props":{
                            "onEvent": 1,
                        },
                        "children":[]
                    }
                ]
            };

            VM.registerFunction.mockImplementation((func) => {
                expect(typeof func).toBe("function");
                return 1;
            });

            VM.renderModal.mockImplementation((uiID, jsxTree, cb) => {
                expect(uiID).toBe("id");
                expect(jsxTree).toEqual(JSON.stringify(expectedJsonTree));
                cb();
            });

            const Button = "Button";

            class ModalComponent extends Modal {
                render(){
                    return (<Button onEvent={function () {}} />)
                }
            }

            renderModal(<ModalComponent modalContainer={new Container("id")}/>, (jsx) => {
                done();
            })

        })

    })

});
