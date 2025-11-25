// Team Screen Component
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TeamMember } from '../types';
import { COLORS } from '../utils/constants';
import TeamMemberCard from '../components/TeamMemberCard';

interface TeamScreenProps {
  teamMembers: TeamMember[];
}

const TeamScreen: React.FC<TeamScreenProps> = ({ teamMembers }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👥 Meet Our Team</Text>
      <Text style={styles.subtitle}>The brilliant minds behind VitaBand</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoIcon}>ℹ️</Text>
        <Text style={styles.infoText}>
          Team profiles are managed by the administrator. To update your information, please contact the project admin.
        </Text>
      </View>

      {teamMembers.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}

      <View style={styles.bottomNote}>
        <Text style={styles.bottomNoteText}>
          💚 Built with passion by the VitaBand Team
        </Text>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray[500],
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.gray[700],
    lineHeight: 20,
  },
  bottomNote: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  bottomNoteText: {
    fontSize: 14,
    color: COLORS.gray[500],
    fontStyle: 'italic',
  },
});

export default TeamScreen;