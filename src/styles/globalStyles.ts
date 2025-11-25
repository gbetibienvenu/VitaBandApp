// Global Styles
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../utils/constants';

const screenWidth = Dimensions.get('window').width;

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  
  // Cards
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  // Text Styles
  titleLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray[800],
  },
  titleMedium: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray[800],
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray[500],
  },
  bodyText: {
    fontSize: 15,
    color: COLORS.gray[700],
    lineHeight: 22,
  },

  // Buttons
  primaryButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dangerButton: {
    backgroundColor: COLORS.danger,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Input
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    backgroundColor: COLORS.gray[50],
    color: COLORS.gray[800],
  },

  // Spacing
  marginBottom16: {
    marginBottom: 16,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  padding20: {
    padding: 20,
  },
});