import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  // Mock data for trips
  const myTrips = [
    { id: 1, title: 'Paris Adventure', date: '2024-06-15', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a' },
    { id: 2, title: 'Tokyo Exploration', date: '2024-07-20', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26' },
  ];

  const exploreTrips = [
    { id: 3, title: 'Bali Paradise', author: 'Jane Doe', likes: 245, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4' },
    { id: 4, title: 'New York City', author: 'John Smith', likes: 189, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Trips</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tripsScroll}>
        {myTrips.map(trip => (
          <TouchableOpacity key={trip.id} style={styles.tripCard}>
            <View style={styles.tripImageContainer}>
              <View style={styles.tripImage} />
            </View>
            <Text style={styles.tripTitle}>{trip.title}</Text>
            <Text style={styles.tripDate}>{trip.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.header}>
        <Text style={styles.title}>Explore Trips</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.exploreGrid}>
        {exploreTrips.map(trip => (
          <TouchableOpacity key={trip.id} style={styles.exploreCard}>
            <View style={styles.exploreImageContainer}>
              <View style={styles.exploreImage} />
            </View>
            <Text style={styles.exploreTitle}>{trip.title}</Text>
            <View style={styles.exploreFooter}>
              <Text style={styles.exploreAuthor}>{trip.author}</Text>
              <View style={styles.likesContainer}>
                <Ionicons name="heart" size={16} color="#FF385C" />
                <Text style={styles.likesCount}>{trip.likes}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#FF385C',
    fontSize: 16,
  },
  tripsScroll: {
    paddingLeft: 16,
  },
  tripCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tripImageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tripImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 12,
    paddingBottom: 4,
  },
  tripDate: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  exploreGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  exploreCard: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  exploreImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
  },
  exploreImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  exploreTitle: {
    fontSize: 16,
    fontWeight: '600',
    padding: 12,
    paddingBottom: 4,
  },
  exploreFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  exploreAuthor: {
    fontSize: 14,
    color: '#666',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
});