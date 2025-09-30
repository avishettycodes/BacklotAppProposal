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
        {/* Content Area */}
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 24 + bottomInset, paddingTop: 24 }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcoming Header */}
          <View style={styles.welcomeHeader}>
            <Text style={styles.welcomeTitle}>Sell Your Car</Text>
            <Text style={styles.welcomeSubtitle}>Fill in a few details and you're done!</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Photos */}
            <View style={styles.card}>
              <View style={styles.imagePickerContainer}>
                <View style={styles.imagePicker}>
                  <Text style={styles.imagePickerText}>📷</Text>
                  <Text style={styles.imagePickerLabel}>Add Photos</Text>
                </View>
              </View>
            </View>

            {/* Car Info */}
            <View style={styles.card}>
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Year</Text>
                  <Text style={styles.textInput}>2020</Text>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Make</Text>
                  <Text style={styles.textInput}>Tesla</Text>
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Model</Text>
                  <Text style={styles.textInput}>Model 3</Text>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Trim</Text>
                  <Text style={styles.textInput}>Long Range</Text>
                </View>
              </View>
            </View>

            {/* Price & Mileage */}
            <View style={styles.card}>
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Price</Text>
                  <Text style={styles.textInput}>$34,990</Text>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Miles</Text>
                  <Text style={styles.textInput}>12,400</Text>
                </View>
              </View>
            </View>

            {/* Location */}
            <View style={styles.card}>
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>City</Text>
                  <Text style={styles.textInput}>San Jose</Text>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>State</Text>
                  <Text style={styles.textInput}>CA</Text>
                </View>
              </View>
            </View>

            {/* Condition */}
            <View style={styles.card}>
              <Text style={styles.cardLabel}>Condition</Text>
              <View style={styles.segmentedControl}>
                <Pressable
                  style={[
                    styles.segment,
                    condition === 'New' && styles.segmentActive,
                  ]}
                  onPress={() => setCondition('New')}
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

            {/* Details */}
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Title Status</Text>
                <Text style={styles.textInput}>Clean Title</Text>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Transmission</Text>
                  <Text style={styles.textInput}>Automatic</Text>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Fuel</Text>
                  <Text style={styles.textInput}>Electric</Text>
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Exterior</Text>
                  <Text style={styles.textInput}>Pearl White</Text>
                </View>
                <View style={[styles.inputGroup, styles.halfWidth]}>
                  <Text style={styles.label}>Interior</Text>
                  <Text style={styles.textInput}>Black</Text>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Seats</Text>
                <Text style={styles.textInput}>5</Text>
              </View>
            </View>

            {/* Description */}
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <Text style={styles.cardLabel}>About Your Car</Text>
                <Text style={[styles.textInput, styles.textArea]}>
                  Tell buyers what makes your car special...
                </Text>
              </View>
            </View>

            {/* Good & Bad */}
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Pros</Text>
                <Text style={[styles.textInput, styles.textArea]}>
                  Low mileage{'\n'}Clean title{'\n'}Great condition
                </Text>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cons</Text>
                <Text style={[styles.textInput, styles.textArea]}>
                  Minor door ding{'\n'}Tires need replacing soon
                </Text>
              </View>
            </View>

            <Pressable
              style={[styles.submitButton, styles.submitButtonDisabled]}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="List car button, disabled"
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
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  welcomeHeader: {
    marginBottom: 32,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
  form: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    gap: 16,
  },
  cardLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  imagePickerContainer: {
    alignItems: 'center',
  },
  imagePicker: {
    width: '100%',
    height: 150,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#3B82F6',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 48,
    marginBottom: 8,
  },
  imagePickerLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#3B82F6',
  },
  inputGroup: {
    gap: 10,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 0,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#CBD5E1',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
    textAlignVertical: 'top',
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 4,
    gap: 8,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  segmentActive: {
    backgroundColor: '#3B82F6',
  },
  segmentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94A3B8',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#3B82F6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    backgroundColor: '#94A3B8',
    opacity: 0.7,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  helperText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#94A3B8',
    marginTop: 12,
  },
});
