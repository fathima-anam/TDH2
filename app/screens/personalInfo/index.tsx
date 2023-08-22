import { AntDesign, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, View, Image, TextInput, StyleSheet, Text } from 'react-native';
import Screen from '@/components/Screen';
import AppStyles from '@/styles';
import { ProfileStackList } from '@/types';
// import * as ImagePicker from 'expo-image-picker';
import { ErrorText } from '@/components/ErrorText';

// interface Props {
//     navigation: StackNavigationProp<ProfileStackList, 'PersonalInfo'>
// }

export default function PersonalInfo({ navigation }: Props) {
    const { colors } = useTheme();
    const [image, setImage] = useState<any>(null);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            mobile: '',
            password: '',
            confirmPassword: '',
            email: ''
        }
    });

    const pickImage = async () => {
        // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
        // let result = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.All,
        //     allowsEditing: true,
        //     aspect: [4, 3],
        //     quality: 1,
        // });
        // if (!result.cancelled && result.uri) {
        //     const filename = result.uri.split('/').pop();
        //     const match = /\.(\w+)$/.exec(filename!!);
        //     const type = match ? `image/${match[1]}` : `image`;
        //     setImage({ uri: result.uri, name: filename, type });
        // }
    }

    const onSubmit = async (data: any) => {
        (navigation as any).navigate('Main', { screen: 'Home' })
    }

    const navigateToLogin = () => {
        navigation.goBack()
    }

    return (
        <Screen style={AppStyles.screen}>
            <View style={styles.imageRow}>
                <Pressable onPress={pickImage}>
                    {image == null ? <View style={styles.imageWrapper}>
                        <AntDesign name="user" size={40} color="black" />
                        <Feather name="camera" size={24} color="black" style={styles.cameraIcon} />
                    </View> :
                        <Image source={{ uri: image.uri }} style={styles.imageWrapper} />}
                </Pressable>
            </View>
            <View style={styles.row}>
                <AntDesign name="user" size={20} />
                <Controller
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={AppStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder="Name"
                            value={value}
                            keyboardType="default"
                        />
                    )}
                    name="username" />
            </View>
            {errors.username && <ErrorText>Name is required.</ErrorText>}
            <View style={[styles.row, styles.topspace]}>
                <Entypo name="email" size={20} color="black" />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={AppStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder="email"
                            value={value}
                            keyboardType="email-address"
                        />
                    )}
                    name="email" />
            </View>
            {errors.email && <ErrorText>Email is required.</ErrorText>}
            <View style={[styles.row, styles.topspace]}>
                <Entypo name="mobile" size={20} color="black" />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                        pattern: /\d{10}/,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={AppStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            placeholder="mobile"
                            value={value}
                            maxLength={10}
                            keyboardType="decimal-pad"
                        />
                    )}
                    name="mobile" />
            </View>
            {errors.mobile && <ErrorText>Mobile is required.</ErrorText>}
            <View style={[styles.row, styles.topspace]}>
                <Ionicons name="key-outline" size={20} color="black" />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={AppStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            textContentType="password"
                            placeholder="Password"
                            secureTextEntry={true} />
                    )}
                    name="password" />
            </View>
            {errors.password && <ErrorText>Password is required</ErrorText>}
            <View style={[styles.row, styles.topspace]}>
                <Ionicons name="key-outline" size={20} color="black" />
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={AppStyles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            textContentType="password"
                            placeholder="Confirm Password"
                            secureTextEntry={true} />
                    )}
                    name="confirmPassword" />
            </View>
            {errors.confirmPassword && <ErrorText>Password is required</ErrorText>}
            <Pressable
                style={[AppStyles.topspace, AppStyles.button, { backgroundColor: colors.primary }]}
                android_ripple={{ color: colors.border }}
                onPress={handleSubmit(onSubmit)}>
                <Text style={AppStyles.buttonText}>Update My Information</Text>
            </Pressable>
        </Screen>
    )
}

const styles = StyleSheet.create({
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    imageWrapper: {
        backgroundColor: '#f2f2f2',
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 24,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 2,
        right: 4,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#F1EFF5',
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center'
    },
    topspace: {
        marginTop: 24,
    },
    registerWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 24,
    },
    registerButton: {
        marginTop: 6,
    },
    registerButtonText: {
        fontSize: 16,
        borderBottomWidth: 1,
    }
});