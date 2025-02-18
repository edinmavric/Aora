import { StatusBar } from 'expo-status-bar';
import { Redirect, Tabs } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { icons } from '../../constants';
import { Loader } from '../../components';
import { useGlobalContext } from '../../context/GlobalProvider';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="flex items-center justify-center gap-2 min-w-[71px]">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6 aspect-square"
            />
            <Text
                className={`${
                    focused ? 'font-psemibold' : 'font-pregular'
                } text-xs`}
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    );
};

const TabLayout = () => {
    const { loading, isLogged } = useGlobalContext();

    if (!loading && !isLogged) return <Redirect href="/sign-in" />;

    return (
        <>
            <View className="absolute bottom-[115px] left-0 w-full h-[2px] bg-black/30 shadow-lg shadow-black/40 z-10" />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 0,
                        height: 84,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.home}
                                color={color}
                                name="Home"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="bookmark"
                    options={{
                        title: 'Bookmark',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.bookmark}
                                color={color}
                                name="Bookmark"
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="create"
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.plus}
                                color={color}
                                name="Create"
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                icon={icons.profile}
                                color={color}
                                name="Profile"
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs>

            <Loader isLoading={loading} />
            <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
};

export default TabLayout;
