// Tab Navigation Component
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TabName } from '../types';
import { COLORS } from '../utils/constants';

interface TabNavigationProps {
  activeTab: TabName;
  onTabChange: (tab: TabName) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs: { name: TabName; label: string; icon: string }[] = [
  { name: 'insights', label: 'Insights', icon: '💡' },
  { name: 'dashboard', label: 'Dashboard', icon: '📊' },
  { name: 'settings', label: 'Settings', icon: '⚙️' },
];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={[styles.tab, activeTab === tab.name && styles.activeTab]}
          onPress={() => onTabChange(tab.name)}
        >
          <Text
            style={[styles.tabText, activeTab === tab.name && styles.activeTabText]}
          >
            {tab.icon} {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.gray[500],
  },
  activeTabText: {
    color: COLORS.primary,
  },
});
export default TabNavigation;