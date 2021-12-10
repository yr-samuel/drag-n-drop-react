import React, { useState } from 'react';
import { useObservable } from 'react-use-observable';

import { dataService } from './services/data';
import dragService from './services/drag';


const RowItem: React.VFC<any> = (props: any) => {
  const { index, style } = props;
  const [data] = useObservable(() => dataService.getData(), []);

  const [opacity, setOpacity] = useState(1);

  const [isGrid] = useObservable(() => dragService.listenIsGrid(), [])
  const handleDragStart = (e: React.DragEvent) => {

    if (isGrid) {
      e.dataTransfer.setData("text", (props.rowIndex * 10) + props.columnIndex)
    } else {
       e.dataTransfer.setData("text", index);
    }
  }

  const returnMatrix = () => {
    const previousArray = [...data || []];
    const newArr:any = [];

    while(previousArray.length) newArr.push(previousArray.splice(0, 10))
    return newArr;
  }

  const onDrop = (e: React.DragEvent) => {
    console.table({
      "INITIAL_INDEX": Number(localStorage.getItem("startIndex")),
      "FINAL_INDEX": index
    })

    if (isGrid) {
      dataService.changeItemOfPlace(Number(e.dataTransfer.getData("text")), (props.rowIndex * 10) + props.columnIndex);
    } else {
       dataService.changeItemOfPlace(Number(e.dataTransfer.getData("text")), index);
    }
    setOpacity(1);
  }

  function handleClick() {
    console.log((props.rowIndex * 10) + props.columnIndex);
  }

  function onDragEnter(ev:any) {
    ev.preventDefault();

    setOpacity(0.5);
  }

  function onDragLeave(ev:any) {
    ev.preventDefault();

    setOpacity(1);
  }

  console.log(data && data[0])

  return (
    <div
      style={{
        ...style,
        userSelect: "none",
        cursor: "grab",
        // margin: 20,
        // borderTopColor: borderTop,
        // borderBottomColor: borderBottom,
        fontWeight: 600,
        // background: 'blue',
        border: '1px solid black',
        color: "white",
        opacity,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        boxSizing: 'border-box'
      }}
      onClick={() => isGrid && handleClick()}
      draggable
      onDragStart={handleDragStart}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={(e) => e.preventDefault()}
    >
      <div style={{color: 'blue'}}>

      {!isGrid &&  data && data[index]?.id}
      {isGrid && `[R: ${props.rowIndex}, C: ${props.columnIndex}] ${returnMatrix()[props.rowIndex][props.columnIndex].title.split(" ")[0]}` }
      </div>
      </div>
  );
};

export default RowItem;
