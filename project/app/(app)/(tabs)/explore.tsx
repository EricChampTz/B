import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useLocations } from '../../../hooks/useLocations';
import { Location } from '../../../types/trip';

export default function ExploreScreen() {
  const { locations, isLoading, error, addLocation } = useLocations();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [newLocation, setNewLocation] = useState({
    name: '',
    description: '',
    latitude: 0,
    longitude: 0,
  });

  const handleMapPress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setNewLocation(prev => ({
      ...prev,
      latitude,
      longitude,
    }));
    setModalVisible(true);
  };

  const handleAddLocation = async () => {
    try {
      await addLocation(newLocation);
      setModalVisible(false);
      setNewLocation({
        name: '',
        description: '',
        latitude: 0,
        longitude: 0,
      });
    } catch (err) {
      console.error('Failed to add location:', err);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF385C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.7128,
          longitude: -74.0060,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {locations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            onPress={() => setSelectedLocation(location)}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{location.name}</Text>
                {location.description && (
                  <Text style={styles.calloutDescription}>{location.description}</Text>
                )}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Location</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Location Name"
              value={newLocation.name}
              onChangeText={(text) => setNewLocation(prev => ({ ...prev, name: text }))}
            />
            
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={newLocation.description}
              onChangeText={(text) => setNewLocation(prev => ({ ...prev, description: text }))}
              multiline
              numberOfLines={4}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.addButton]}
                onPress={handleAddLocation}
              >
                <Text style={styles.buttonText}>Add Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
  callout: {
    padding: 8,
    maxWidth: 200,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  calloutDescription: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  addButton: {
    backgroundColor: '#FF385C',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 8,
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
  },
});