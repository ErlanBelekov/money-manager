import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { Spacing } from '../../constants';

const EMOJI_PADDING = Spacing.MD;

const Emoji = ({
  parentWidth,
  emoji,
  isActive,
  index,
  onChoose,
}: {
  parentWidth: number;
  emoji: string;
  isActive: boolean;
  index: number;
  onChoose: (idx: number) => void;
}) => {
  return (
    <Pressable
      onPress={() => emoji && onChoose(index)}
      style={{
        marginHorizontal: EMOJI_PADDING,
        padding: 10,
        backgroundColor: isActive ? 'grey' : 'transparent',
        borderRadius: 10,
        height: Math.floor(parentWidth / 3),
        width: Math.floor(parentWidth / 3),
      }}>
      <Text
        adjustsFontSizeToFit
        style={{
          height: '100%',
          fontSize: Math.floor(parentWidth / 3),
        }}>
        {emoji}
      </Text>
    </Pressable>
  );
};

export function SpendingCategoryInput({
  active,
  setActive,
  categoriesImages = [],
}: {
  active: number;
  setActive: (index: number) => void;
  categoriesImages: string[];
}) {
  const [parentWidth, setParentWidth] = useState(0);
  const ref = useRef<FlatList>(null);

  useEffect(() => {
    if (active && ref.current) {
      // ref.current.scrollToIndex({ animated: true, index: active });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, ref, ref.current]);

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => setParentWidth(width)}>
      <FlatList
        horizontal
        ref={ref}
        showsHorizontalScrollIndicator={false}
        data={categoriesImages}
        keyExtractor={(_, index) => String(index)}
        getItemLayout={(_, index) => ({
          index,
          length: parentWidth / 3 + EMOJI_PADDING * 2 + 20,
          offset: (parentWidth / 3 + EMOJI_PADDING * 2 + 20) * index,
        })}
        renderItem={({ item, index }) => (
          <Emoji
            emoji={item}
            parentWidth={parentWidth}
            isActive={index === active}
            index={index}
            onChoose={(chosen) => setActive(chosen)}
          />
        )}
      />
    </View>
  );
}
