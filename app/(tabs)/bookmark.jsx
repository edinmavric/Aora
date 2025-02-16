import { Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const bookmarks = [
    { id: '1', title: 'Bookmark 1' },
    { id: '2', title: 'Bookmark 2' },
    { id: '3', title: 'Bookmark 3' },
];

const Bookmark = () => {
    return (
        <SafeAreaView className="px-4 my-6 bg-primary h-full">
            <Text className="text-2xl text-white font-psemibold">
                Bookmarks
            </Text>
            <FlatList
                data={bookmarks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View className="p-4 bg-gray-800 my-2 rounded-lg">
                        <Text className="text-white">{item.title}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Bookmark;
