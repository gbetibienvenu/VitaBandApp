// Team Member Card Component
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
import { TeamMember } from '../types';
import { COLORS } from '../utils/constants';

interface TeamMemberCardProps {
  member: TeamMember;
}


const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const openSocialLink = (platform: string, username: string) => {
    let url = '';
    
    switch (platform) {
      case 'github':
        url = `https://github.com/${username}`;
        break;
      case 'linkedin':
        url = `https://linkedin.com/in/${username}`;
        break;
      case 'twitter':
        url = `https://twitter.com/${username}`;
        break;
    }

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', `Cannot open ${platform} link`);
        }
      })
      .catch((err) => {
        console.error('Error opening URL:', err);
        Alert.alert('Error', 'Failed to open link');
      });
  };

  const hasSocialLinks = member.social.github || member.social.linkedin || member.social.twitter;


  
   return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        {member.image ? (
          <Image 
            source={typeof member.image === 'string' ? { uri: member.image } : member.image} 
            style={styles.avatar} 
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>{member.name.charAt(0)}</Text>
          </View>
        )}
      </View>

      <Text style={styles.name}>{member.name}</Text>
      <Text style={styles.role}>{member.role}</Text>

      {hasSocialLinks ? (
        <View style={styles.socialContainer}>
          {member.social.github && (
            <TouchableOpacity 
              style={[styles.socialButton, styles.githubButton]}
              activeOpacity={0.8}
              onPress={() => openSocialLink('github', member.social.github)}
            >
              <View style={styles.githubIconContainer}>
                <View style={styles.githubCat}>
                  <View style={styles.githubEars}>
                    <View style={styles.githubEarLeft} />
                    <View style={styles.githubEarRight} />
                  </View>
                  <View style={styles.githubFace}>
                    <View style={styles.githubEye} />
                    <View style={styles.githubEye} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {member.social.linkedin && (
            <TouchableOpacity 
              style={[styles.socialButton, styles.linkedinButton]}
              activeOpacity={0.8}
              onPress={() => openSocialLink('linkedin', member.social.linkedin)}
            >
              <View style={styles.linkedinIcon}>
                <Text style={styles.linkedinText}>in</Text>
              </View>
            </TouchableOpacity>
          )}

          {member.social.twitter && (
            <TouchableOpacity 
              style={[styles.socialButton, styles.twitterButton]}
              activeOpacity={0.8}
              onPress={() => openSocialLink('twitter', member.social.twitter)}
            >
              <View style={styles.xIcon}>
                <View style={styles.xLine1} />
                <View style={styles.xLine2} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <Text style={styles.noSocialText}>No social links</Text>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: COLORS.gray[200],
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.gray[200],
  },
  avatarText: {
    fontSize: 48,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: 6,
  },
  role: {
    fontSize: 15,
    color: COLORS.gray[500],
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 16,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  githubButton: {
    backgroundColor: '#24292e',
  },
  linkedinButton: {
    backgroundColor: '#0A66C2',
  },
  twitterButton: {
    backgroundColor: '#000000',
  },
  
  // GitHub Icon (Octocat simplified)
  githubIconContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  githubCat: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  githubEars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 24,
  },
  githubEarLeft: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  githubEarRight: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  githubFace: {
    width: 24,
    height: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  githubEye: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#24292e',
  },
  
  // LinkedIn Icon
  linkedinIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkedinText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'System',
    letterSpacing: -2,
  },
  
  // X/Twitter Icon
  xIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  xLine1: {
    position: 'absolute',
    width: 22,
    height: 3,
    backgroundColor: '#ffffff',
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
  },
  xLine2: {
    position: 'absolute',
    width: 22,
    height: 3,
    backgroundColor: '#ffffff',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 2,
  },
  
  noSocialText: {
    fontSize: 12,
    color: COLORS.gray[400],
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default TeamMemberCard;