import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { ColorItem } from './ColorItem';
import { Color } from '../../../types';
import { colors as themeColors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

interface ColorGridProps {
  colors: Color[];
  selectedColor: Color | null;
  onSelectColor: (color: Color) => void;
}

export const ColorGrid: React.FC<ColorGridProps> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
  // Renderizar cada item de cor
  const renderColorItem = ({ item }: { item: Color }) => {
    return (
      <ColorItem
        color={item}
        isSelected={selectedColor?.id === item.id}
        onSelect={onSelectColor}
      />
    );
  };

  // Função para extrair a chave única para cada item
  const keyExtractor = (item: Color) => item.id;

  // Render
  return (
    <View style={styles.container}>
      {colors.length > 0 ? (
        <FlatList
          data={colors}
          renderItem={renderColorItem}
          keyExtractor={keyExtractor}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          initialNumToRender={10}
          maxToRenderPerBatch={20}
          windowSize={5}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Nenhuma cor disponível no momento.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  flatListContent: {
    paddingVertical: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyText: {
    ...typography.body,
    color: themeColors.textSecondary,
    textAlign: 'center',
  },
});