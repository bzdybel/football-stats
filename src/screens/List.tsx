import React, { useMemo } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';
import { ListItem, ListSeparator } from '../components/List';
import { MainStackParams } from '../navigation/Main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: 20,
  },
});

// const screens = [
//   {
//     title: 'Text',
//     subtitle: 'An example of using the Text.js components.',
//     target: 'TextDemo',
//   },
//   {
//     title: 'Form',
//     subtitle: 'An example of using the Form.js components.',
//     target: 'FormDemo',
//   },
//   {
//     title: 'Button',
//     subtitle: 'An example of using the Button.js components.',
//     target: 'ButtonDemo',
//   },
// ];

type Props = {
  navigation: StackNavigationProp<MainStackParams, 'List'>;
};

export const List = ({ navigation }: Props) => {
  const { leagues } = useSelector((state: any) => state.general);
  const screens = useMemo(
    () =>
      leagues.map(e => {
        return {
          title: e.name,
          subtitle: e.abbr,
          target: e.slug,
          image: e.logos,
        };
      }),
    [leagues],
  );

  return (
    <FlatList
      style={styles.container}
      data={screens}
      keyExtractor={item => item.title}
      renderItem={({ item }) => (
        <ListItem
          title={item.title}
          subtitle={item.subtitle}
          image={item.image}
          onPress={() => navigation.navigate(item.target)}
        />
      )}
      ItemSeparatorComponent={ListSeparator}
      ListHeaderComponent={ListSeparator}
      ListFooterComponent={ListSeparator}
    />
  );
};
