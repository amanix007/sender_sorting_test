import React from 'react';
import logo from './logo.svg';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import './App.scss';

// fake data generator
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k, i) => ({
    id: `item-${k}`,
    content: `item ${k}`,
    index: i
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
  display: "table",
  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});


export interface IAppProps {
}

export interface IAppState {
  items: Array<{ id: string, content: string, index: number }>;
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      // items: getItems(10)
      items: []
    };
  }
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

  add = () => {
    let items = getItems(10);
    this.setState({ items });
  }
  public render() {
    return (
      <div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <table
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
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
        </DragDropContext>

        <button onClick={this.add}>Add</button>
      </div>
    );
  }
}



