import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { images } from '../../constants';
import useAppwrite from '../../lib/useAppwrite';
import { getAllPosts, getLatestPosts, getAccount } from '../../lib/appwrite';
import { EmptyState, SearchInput, Trending, VideoCard } from '../../components';

const Home = () => {
    const { data: posts, refetch } = useAppwrite(getAllPosts);
    const { data: latestPosts } = useAppwrite(getLatestPosts);
    const { data: account } = useAppwrite(getAccount);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <SafeAreaView className="bg-primary">
            <FlatList
                data={posts}
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
                        <View className="flex justify-between items-start flex-row mb-6">
                            <View>
                                <Text className="font-pmedium text-sm text-gray-100">
                                    Welcome Back
                                </Text>
                                <Text className="text-2xl font-psemibold text-white">
                                    {account?.name || 'Guest'}
                                </Text>
                            </View>

                            <View className="mt-1.5">
                                <Image
                                    source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        <SearchInput placeholder={'Search for a video topic'} />

                        <View className="w-full flex-1 pt-5 pb-8">
                            <Text className="text-lg font-pregular text-gray-100 mb-3">
                                Latest Videos
                            </Text>

                            <Trending posts={latestPosts ?? []} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos created yet"
                    />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    );
};

export default Home;
