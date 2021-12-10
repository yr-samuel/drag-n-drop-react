import './App.css';

import { useObservable } from 'react-use-observable';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid as Grid, FixedSizeList as List } from 'react-window';

import RowItem from './RowItem';
import { dataService } from './services/data';
import dragService from './services/drag';


function App() {
  const [data] = useObservable(() => dataService.getData(), []);
  const length = data?.length;

  const [isGrid] = useObservable(() => dragService.listenIsGrid(), []);

  return (
    <div className="App"
    >
      <button onClick={() => dragService.setIsGrid()}>{isGrid ? "POE LISTA" : "POE GRID"}</button>


      {
        isGrid ? <div style={{width: '100%', height: '500px'}}>
          <AutoSizer >
          {({ height, width }) => (
            < Grid
              itemData={data}
              columnCount={10}
              rowCount={10}
              columnWidth={250}
              rowHeight={150}
              height={height}
              width={width}
              useIsScrolling
            >

              {RowItem}

            </Grid>
          )}
          </AutoSizer>
        </div>
        :
          <List
            height={500}
            itemCount={length || 0}
            itemSize={70}
            width={'50%'}
            itemData={data}
            useIsScrolling
          >
            {RowItem}
          </List>
      }



    </div>
  );
}

export default App;
