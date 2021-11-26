import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { Text } from './Text';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  row: {
    flex: '1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.white,
  },
  titleText: {
    fontWeight: 'bold',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 15,
  },
});

type ListItemProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
  image: { light: string; dark: string };
};

export const ListItem = ({
  title,
  subtitle,
  onPress = () => null,
  image,
}: ListItemProps) => {
  const rowStyles = [styles.row];

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={rowStyles}>
        <Image style={[styles.image]} source={image.light} />
        <View>
          <Text style={[styles.titleText]}>{title}</Text>
          <Text>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ListSeparator = () => <View style={styles.separator} />;
