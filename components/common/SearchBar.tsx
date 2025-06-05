import { StyleSheet, TextInput, View, TouchableOpacity, ViewStyle, TextInputProps } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { colors } from '@/constants/theme';

interface SearchBarProps extends TextInputProps {
  style?: ViewStyle;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({ style, value, onChangeText, placeholder = 'Search...', ...rest }: SearchBarProps) {
  return (
    <View style={[styles.container, style]}>
      <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
        {...rest}
      />
      {value && value.length > 0 && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => onChangeText?.('')}
        >
          <X size={16} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
});