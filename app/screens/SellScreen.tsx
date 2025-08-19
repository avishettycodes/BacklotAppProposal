import React, { useState } from 'react';
import AppScreen from './AppScreen';
import { ScrollView, View, Text, Pressable, StyleSheet, Platform } from 'react-native';

export default function SellScreen() {
  // Simple safe area calculation
  const bottomInset = Platform.OS === 'ios' ? 34 : 0;
  const [condition, setCondition] = useState('Used');

  return (
    <AppScreen>
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.title}>List Your Car</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Content Area */}
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 24 + bottomInset }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Form */}
          <View style={styles.form}>
            <View style={styles.imagePickerContainer}>
              <View style={styles.imagePicker}>
                <Text style={styles.imagePickerText}>📷</Text>
                <Text style={styles.imagePickerLabel}>Add Photos</Text>
                <Text style={styles.imagePickerSubtext}>Tap to upload images</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Make</Text>
              <Text style={styles.textInput}>e.g., Tesla</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Model</Text>
              <Text style={styles.textInput}>e.g., Model 3</Text>
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Year</Text>
                <Text style={styles.textInput}>2020</Text>
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Price</Text>
                <Text style={styles.textInput}>$34,990</Text>
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Mileage</Text>
                <Text style={styles.textInput}>12,400 mi</Text>
              </View>

              <View style={[styles.inputGroup, styles.halfWidth]}>
                <Text style={styles.label}>Location</Text>
                <Text style={styles.textInput}>San Jose, CA</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Condition</Text>
              <View style={styles.segmentedControl}>
                <Pressable
                  style={[
                    styles.segment,
                    condition === 'New' && styles.segmentActive,
                  ]}
                  onPress={() => setCondition('New')}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="New condition option"
                >
                  <Text
                    style={[
                      styles.segmentText,
                      condition === 'New' && styles.segmentTextActive,
                    ]}
                  >
                    New
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.segment,
                    condition === 'Used' && styles.segmentActive,
                  ]}
                  onPress={() => setCondition('Used')}
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="Used condition option"
                >
                  <Text
                    style={[
                      styles.segmentText,
                      condition === 'Used' && styles.segmentTextActive,
                    ]}
                  >
                    Used
                  </Text>
                </Pressable>
              </View>
            </View>

            <Pressable
              style={[styles.submitButton, styles.submitButtonDisabled]}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="List car button, disabled"
              accessibilityHint="This button is disabled as this is a frontend only demo"
            >
              <Text style={styles.submitButtonText}>List Car</Text>
            </Pressable>

            <Text style={styles.helperText}>
              This is a UI mock. No backend connected.
            </Text>
          </View>
        </ScrollView>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Added background color for the container
  },
  topBar: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 8,
    width: '100%',
  },
  scrollContent: {
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  form: {
    gap: 24,
  },
  imagePickerContainer: {
    alignItems: 'center',
  },
  imagePicker: {
    width: '100%',
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(11, 29, 77, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imagePickerText: {
    fontSize: 48,
    marginBottom: 16,
  },
  imagePickerLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0B1D4D',
    marginBottom: 4,
  },
  imagePickerSubtext: {
    fontSize: 14,
    color: '#64748B',
  },
  inputGroup: {
    gap: 8,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#64748B',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  segmentActive: {
    backgroundColor: '#0B1D4D',
  },
  segmentText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748B',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#0B1D4D',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#64748B',
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  helperText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#64748B',
    marginTop: 16,
  },
});
