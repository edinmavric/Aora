import { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getLikedVideos, getCurrentUser } from '../../lib/appwrite';
import { SearchInput, VideoCard, EmptyState } from '../../components';

const Bookmark = () => {
    const [likedVideos, setLikedVideos] = useState([]);
    const [filteredVideos, setFilteredVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLikedVideos() {
            const user = await getCurrentUser();
            if (user) {
                const videos = await getLikedVideos(user.accountId);
                setLikedVideos(videos);
                setFilteredVideos(videos);
            }
            setLoading(false);
        }

        fetchLikedVideos();
    }, []);

    const handleSearch = query => {
        if (!query.trim()) {
            setFilteredVideos(likedVideos);
        } else {
            setFilteredVideos(
                likedVideos.filter(video =>
                    video.title.toLowerCase().includes(query.toLowerCase())
                )
            );
        }
    };

    if (loading) {
        return (
            <Text className="text-white text-center mt-5">
                Loading saved videos...
            </Text>
        );
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <FlatList
                data={filteredVideos}
                keyExtractor={item => item.$id}
                renderItem={({ item }) => (
                    <VideoCard
                        videoId={item.$id}
                        title={item.title}
                        thumbnail={item.thumbnail}
                        video={item.video}
                        creator={item.creator?.username ?? 'Unknown'}
                        avatar={item.creator?.avatar ?? images.defaultAvatar}
                        likedUsers={item.liked}
                    />
                )}
                ListHeaderComponent={() => (
                    <View className="flex my-6 px-4 space-y-6">
                        <Text className="text-2xl font-psemibold text-white">
                            Saved Videos
                        </Text>
                        <View className="mt-6 mb-8">
                            <SearchInput
                                placeholder="Search your saved videos"
                                onChangeText={handleSearch}
                            />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Saved Videos"
                        subtitle="You haven't saved any videos yet."
                    />
                )}
            />
        </SafeAreaView>
    );
};

export default Bookmark;
