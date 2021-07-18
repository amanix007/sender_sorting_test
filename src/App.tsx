import React from 'react';
import faker from 'faker';
import logo from './logo.svg';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import './App.scss';
import { Modal, Button, Input, Form, FormInstance } from 'antd';
import { useState } from 'react';
import Countdown from 'react-countdown';
import Timer from './Timer';
import { Table, Tag, Space } from 'antd';
// fake data generator
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k, i) => ({
    id: `item-${k}`,
    content: `item ${k}`,
    index: i,
    name: faker.name.findName(),
    location: "Lithuania",
    timeDate: "2019-12-04 09:10:29",
    tags: ["Customer", "VIP", "old Timer"],
    Potatoes: 10,
    email: faker.internet.email(),
  }));

// a little function to help us with reordering the result
const reorder = (list: Iterable<itemType> | ArrayLike<itemType>, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

type itemType = { id: string, content: string, index: number };

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  // userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,
  display: "table-row",
  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 600
});


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};




export interface IAppProps {
}



export interface IAppState {
  itemsInitialValue: Array<itemType>;
  items: Array<itemType>;
  isModalVisible: boolean;
  personNumber: number;
  dataAdded: boolean;
  score: number;
  showScore: boolean;
}





export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    let items = getItems(10);
    this.state = {
      isModalVisible: true,
      personNumber: 20,
      score: 0,
      showScore: false,
      itemsInitialValue: [],
      items: [],
      dataAdded: false,


      // items, itemsInitialValue: items, dataAdded: true,
    };
  }

  formRef = React.createRef<FormInstance>();
  onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    }, () => {
      console.log("items", items);

    });
  }

  add = (number: number) => {
    let items = getItems(number);
    this.setState({ items, itemsInitialValue: items, dataAdded: true });
  }

  onFinish = (values: any) => {
    this.setState({
      isModalVisible: false,
    }, () => {
      this.add(this.state.personNumber);
    })
    console.log(values);
  };

  onReset = () => {
    this.formRef.current!.resetFields();
  };

  onFill = () => {
    this.formRef.current!.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

  showModal = () => {
    this.setState({ isModalVisible: true });
  };




  onTimeComplete = () => {
    alert("dd");
    var total = this.state.items.length;
    var count = 0;
    for (var i = 0; i < total; i++) {
      if (this.state.itemsInitialValue[i] == this.state.items[i]) {
        count++;
      }
    }
    this.setState({
      showScore: true,
      score: (count / total) * 100,
    })

  }
  handleOk = () => {
    this.setState({
      showScore: false,
    })
  }
  handleCancel = () => {
    this.setState({
      showScore: false,
    })
  }
  public render() {
    let { personNumber, dataAdded, score } = this.state;
    return (
      <div >
        {dataAdded && <Timer
          onTimeComplete={this.onTimeComplete}
        />}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className="table-concept">
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <table
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  <thead>
                    <tr>

                      <th>ID</th>
                      <th>Context</th>
                      <th>index</th>


                    </tr>
                  </thead>
                  <tbody>
                    {this.state.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <td>
                              {item.id}
                            </td>
                            <td>
                              {item.content}
                            </td>
                            <td>
                              {item.index}
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </div>
        </DragDropContext>

        <button onClick={this.showModal}>Add Again</button>
        <Modal title="How many people?" visible={this.state.isModalVisible}
          footer={null}




        >
          <p>Enter a number of how many people you want to add to the list.</p>
          <Form {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
            <Form.Item name="personNumber"
              rules={[
                {
                  required: true,
                  message: 'Please enter Number of people you want to add!',
                },
                ({ getFieldValue }) => ({

                  validator(_, value) {
                    if (personNumber > 19 && personNumber < 201) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Number must have to be between 20 to 200'));
                  },
                }),
              ]}
            >
              <Input type="number" min={"20"} max={"200"}
                value={this.state.personNumber}
                onChange={e => {
                  let personNumber = parseInt(e.target.value);
                  this.setState({ personNumber });
                  // if (personNumber > 20 && personNumber < 201) {
                  // }
                }
                }

              />
            </Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form>
        </Modal>
        <Modal title="Your Score" visible={this.state.showScore}
          // footer={null}
          onOk={this.handleOk} onCancel={this.handleCancel}



        >
          <p>Enter a number of how many people you want to add to the list.</p>

          Your Score : {this.state.score}
          <Button type="primary" htmlType="submit">Submit</Button>
        </Modal>
      </div>
    );
  }
}



