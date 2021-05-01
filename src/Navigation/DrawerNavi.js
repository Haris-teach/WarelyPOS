import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
    Drawer,
    Text
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DrawerNavigate = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <Drawer.Section style={styles.drawerSection}>
                <DrawerItem
                    icon={() => (
                        <Image source={require('../assets/Logo.jpg')} style={{ alignItems: 'center', width: wp('16%'), height: hp('10%') }} resizeMode='contain' />
                    )}
                    label={"1"}
                />
                <DrawerItem
                    // icon={() => (
                    //     <Image source={require('../assest/icons/location.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
                    // )}
                    label={Lable1}
                    onPress={() => {
                        props.navigation.navigate('Dinning');
                    }}
                />
                <DrawerItem
                    // icon={() => (
                    //     <Image source={require('../assest/icons/pay.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
                    // )}
                    label={Lable2}
                    onPress={() => {
                        props.navigation.navigate('Sale History');
                    }}
                />
                <DrawerItem
                    // icon={() => (
                    //     <Image source={require('../assest/icons/pay.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
                    // )}
                    label={Lable3}
                    onPress={() => {
                        props.navigation.navigate('Shift');
                    }}
                />

                <DrawerItem
                    // icon={() => (
                    //     <Image source={require('../assest/icons/stats.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
                    // )}
                    label={Lable4}
                    onPress={() => {
                        props.navigation.navigate('Setting');
                    }}
                />
                <DrawerItem
                    // icon={() => (
                    //     <Image source={require('../assest/icons/stats.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
                    // )}
                    label={Lable6}
                    onPress={() => {
                        props.navigation.closeDrawer();
                    }}
                />

            </Drawer.Section>
        </DrawerContentScrollView>
    );
};

const Lable1 = () => {
    return (

        <View style={styles.boxStyle}>
            <Text style={{ fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold' }}>HOME</Text>
        </View>


    );
};

const Lable2 = () => {
    return (

        <View style={styles.boxStyle}>
            <Text style={{ fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold' }}>SALE HISTORY</Text>
        </View>


    );
};

const Lable3 = () => {
    return (

        <View style={styles.boxStyle}>
            <Text style={{ fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold' }}>SHIFT</Text>
        </View>


    );
};

const Lable4 = () => {
    return (

        <View style={styles.boxStyle}>
            <Text style={{ fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold' }}>SETTING</Text>
        </View>


    );
};

const Lable6 = () => {
    return (

        <View style={{


            borderRadius: 2,
            width: wp('20%'),
            height: hp('5%'),
            alignSelf: 'center',
            marginTop: -13,
            backgroundColor: 'red',
            justifyContent: 'center'
        }}>
            <Text style={{ fontSize: wp('1.2%'), color: 'white', alignSelf: 'center', fontWeight: 'bold' }}>CLOSE SALE</Text>
        </View>

    );
};
export default DrawerNavigate;

const styles = StyleSheet.create({

    drawerContent: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    drawerSection: {
        marginTop: 2,
        marginLeft: "10%",
        alignSelf: 'center'

    },
    boxStyle: {
        borderWidth: 2,
        borderRadius: 6,
        width: wp('15%'),
        height: hp('5%'),
        justifyContent: 'center',
        marginTop: -13,
        alignSelf: 'center',
    }
});