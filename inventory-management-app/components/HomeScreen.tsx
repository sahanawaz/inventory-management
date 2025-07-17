import { View, StyleSheet } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../shared/SharedConstants'
import { Button, Card, Icon, Text } from 'react-native-paper'

type HomeScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Shine Collection Inventory Management</Text>
      
      <Card style={styles.card} onPress={() => navigation.navigate('Billing')}>
        <Card.Content>
          <Text variant="titleLarge">Billing Counter</Text>
          <Text variant="bodyMedium">Manage customer transactions</Text>
          
          
        </Card.Content>
        <Card.Actions>
          <Button icon={"file-document-multiple"}>Open</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.card} onPress={() => navigation.navigate('Inventory')}>
        <Card.Content>
          <Text variant="titleLarge">Inventory</Text>
          <Text variant="bodyMedium">Manage products and stock</Text>
        </Card.Content>
        <Card.Actions>
          <Button icon="cart-variant">Open</Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    borderRadius: 8,
  },
});

export default HomeScreen