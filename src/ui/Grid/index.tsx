import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';

interface GridDataItem {
  key: string;
  empty?: boolean;
}

function formatData<K extends GridDataItem>(data: K[], numColumns: number) {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({
      key: `blank-${numberOfElementsLastRow}`,
      empty: true as boolean,
    } as K);
    numberOfElementsLastRow++;
  }

  return data;
}

const DEFAULT_NUM_COLUMNS = 3;

export interface GridProps<T> {
  numColumns?: number;
  data: T[];
}

export function Grid<T extends GridDataItem>(props: GridProps<T>) {
  const { numColumns = DEFAULT_NUM_COLUMNS, data } = props;

  const renderItem = ({ item }: { item: T & GridDataItem; index: number }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={formatData<T>(data, numColumns)}
      style={styles.container}
      renderItem={renderItem}
      numColumns={numColumns}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: Dimensions.get('window').width / DEFAULT_NUM_COLUMNS, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
});

// import React from 'react';
// import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';

// const data = [
//   { key: 'A' },
//   { key: 'B' },
//   { key: 'C' },
//   { key: 'D' },
//   { key: 'E' },
//   { key: 'F' },
//   { key: 'G' },
//   { key: 'H' },
//   { key: 'I' },
//   { key: 'J' },
//   // { key: 'K' },
//   // { key: 'L' },
// ];

// const formatData = (data, numColumns) => {
//   const numberOfFullRows = Math.floor(data.length / numColumns);

//   let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
//   while (
//     numberOfElementsLastRow !== numColumns &&
//     numberOfElementsLastRow !== 0
//   ) {
//     data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
//     numberOfElementsLastRow++;
//   }

//   return data;
// };

// const numColumns = 5;
// export class Grid extends React.Component {
//   renderItem = ({ item, index }) => {
//     console.log(item);
//     if (item.empty) {
//       return <View style={[styles.item, styles.itemInvisible]} />;
//     }
//     return (
//       <View style={styles.item}>
//         <Text style={styles.itemText}>{item.key}</Text>
//       </View>
//     );
//   };

//   render() {
//     return (
//       <FlatList
//         data={formatData(data, numColumns)}
//         style={styles.container}
//         renderItem={this.renderItem}
//         numColumns={numColumns}
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'red',
//   },
//   item: {
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     margin: 1,
//     height: Dimensions.get('window').width / numColumns, // approximate a square
//   },
//   itemInvisible: {
//     backgroundColor: 'yellow',
//   },
//   itemText: {
//     color: '#fff',
//   },
// });
