/**
 * Created by januslo on 2018/12/27.
 */

import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    DeviceEventEmitter,
    NativeEventEmitter,
    Switch,
    TouchableOpacity,
    Dimensions,
    ToastAndroid
} from 'react-native';
import { BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter } from "react-native-bluetooth-escpos-printer";
import MainDashboard from '../screens/Dinning';
import EscPos from "./escpos";
import Tsc from "./tsc";
import { useDispatch, useSelector } from 'react-redux';



var { height, width } = Dimensions.get('window');
var _listeners = [];


const base64Image = "http://simpleicon.com/wp-content/uploads/rocket.png";
const Home = (props) => {



    const [devices, setDevices] = useState(null);
    const [pairedDs, setPairedDs] = useState([]);
    const [foundDs, setFoundDs] = useState([]);
    const [bleOpend, setBleOpend] = useState(false);
    const [loading, setLoading] = useState(true);
    const [boundAddress, setBoundAddress] = useState('');
    const [debugMsg, setdebugMsg] = useState('');
    const [state1, setState1] = useState(1);
    const [name, setName] = useState('');
    const { allData, total2, dis2 } = useSelector((state) => state.root.main);
    console.log("ALLDATA is ===", allData)
    // constructor() {
    //     super();
    //     this.state = {
    //         devices: null,
    //         pairedDs: [],
    //         foundDs: [],
    //         bleOpend: false,
    //         loading: true,
    //         boundAddress: '',
    //         debugMsg: '',
    //         state1: true,
    //     }
    // }

    useEffect(() => {
        BluetoothManager.isBluetoothEnabled().then((enabled) => {
            // this.setState({
            //     bleOpend: Boolean(enabled),
            //     loading: false
            // })
            setBleOpend(Boolean(enabled));
            setLoading(false);
        }, (err) => {
            err
        });

        if (Platform.OS === 'ios') {
            let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
            _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
                (rsp) => {
                    _deviceAlreadPaired(rsp)
                }));
            _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
                _deviceFoundEvent(rsp)
            }));
            _listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
                // this.setState({
                //     name: '',
                //     boundAddress: ''
                // });
                setName('');
                setBoundAddress('');
            }));
        } else if (Platform.OS === 'android') {
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) => {
                    _deviceAlreadPaired(rsp)
                }));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
                    _deviceFoundEvent(rsp)
                }));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_CONNECTION_LOST, () => {
                    // this.setState({
                    //     name: '',
                    //     boundAddress: ''
                    // });
                    setName('');
                    setBoundAddress('');
                }
            ));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
                    ToastAndroid.show("Device Not Support Bluetooth !", ToastAndroid.LONG);
                }
            ))
        }
        _scan();
    }, []);




    const print = async () => {



        try {

            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
            await BluetoothEscposPrinter.setBlob(0);
            await BluetoothEscposPrinter.printText("Warely POS\r\n", {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 1,
                heigthtimes: 1,
                fonttype: 2
            });
            await BluetoothEscposPrinter.setBlob(0);
            await BluetoothEscposPrinter.printText("Phone: 0000000\r\n", {
                encoding: 'GBK',
                codepage: 0,
                widthtimes: 0,
                heigthtimes: 0,
                fonttype: 2
            });
            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);

            await BluetoothEscposPrinter.printText("Date:" + (dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")) + "\r\n", {});

            await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});

            await BluetoothEscposPrinter.setBlob(0);
            await BluetoothEscposPrinter.printColumn(columnWidths,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                ["Name", "Quantity", "Price"], {});

            await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});

            allData.map(async i => {
                await BluetoothEscposPrinter.printColumn(columnWidths,
                    [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                    [i.item, i.qty, i.p], {});

            });
            await BluetoothEscposPrinter.printColumn(columnWidths,
                [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.RIGHT],
                ["Total + ", total2 - dis2], {});


            await BluetoothEscposPrinter.printPic(base64Image, { width: 2, left: 2 });
            await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});

        } catch (e) {
            alert(e.message || "ERROR");
        }

        <View>

            <Image style={{ width: 60, height: 60 }} source={{ uri: "data:image/png;base64," + base64Image }} />

        </View>

    }

    const _deviceAlreadPaired = (rsp) => {
        var ds = null;
        if (typeof (rsp.devices) == 'object') {
            ds = rsp.devices;
        } else {
            try {
                ds = JSON.parse(rsp.devices);
            } catch (e) {
            }
        }
        if (ds && ds.length) {
            let pared = pairedDs;
            pared = pared.concat(ds || []);
            setPairedDs(pared);
            pared.map(i => {
                if (i.address == '3F:34:32:3D:41:2C') {
                    setLoading(true);
                    BluetoothManager.connect('3F:34:32:3D:41:2C')
                        .then((s) => {

                            setLoading(false);
                            setBoundAddress('3F:34:32:3D:41:2C');
                            setName('MHT-P80A' || "UNKNOWN");
                            console.log("Connected");
                        }, (e) => {

                            setLoading(false);
                            alert(e);
                            console.log("Not Connected");
                        }).then(() => {
                            print();
                        }).then(() => {
                            Paper_Cut();
                        });

                }

            })

        }
    }

    const _deviceFoundEvent = (rsp) => {//alert(JSON.stringify(rsp))
        var r = null;
        try {
            if (typeof (rsp.device) == "object") {
                r = rsp.device;
            } else {
                r = JSON.parse(rsp.device);
            }
        } catch (e) {//alert(e.message);
            //ignore
        }
        //alert('f')
        if (r) {
            let found = foundDs || [];
            if (found.findIndex) {
                let duplicated = found.findIndex(function (x) {
                    return x.address == r.address
                });
                //CHECK DEPLICATED HERE...
                if (duplicated == -1) {
                    // found.push(r);
                    found.push(r);
                    // this.setState({
                    //     foundDs: found
                    // });
                    setFoundDs(found);
                }
            }
        }
    }

    const _renderRow = (rows) => {
        let items = [];
        for (let i in rows) {
            let row = rows[i];
            if (row.address) {
                items.push(
                    <TouchableOpacity key={new Date().getTime() + i} style={styles.wtf} onPress={() => {
                        // this.setState({
                        //     loading: true
                        // });
                        setLoading(true);
                        console.log("Printer Address===", row.address);
                        BluetoothManager.connect(row.address)
                            .then((s) => {
                                // this.setState({
                                //     loading: false,
                                //     boundAddress: row.address,
                                //     name: row.name || "UNKNOWN"
                                // })
                                setLoading(false);
                                setBoundAddress(row.address);
                                setName(row.name || "UNKNOWN");
                            }, (e) => {
                                // this.setState({
                                //     loading: false
                                // })
                                setLoading(false);
                                alert(e);
                            })

                    }}><Text style={styles.name}>{row.name || "UNKNOWN"}</Text><Text
                        style={styles.address}>{row.address}</Text></TouchableOpacity>
                );
            }
        }
        return items;
    }






    const Paper_Cut = async () => {



        try {
            await BluetoothEscposPrinter.printPic(base64Image, { width: 2, left: 2 });
            await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
        } catch (e) {
            alert(e.message || "ERROR")
        }

        <View>

            <Image style={{ width: 60, height: 60 }} source={{ uri: "data:image/png;base64," + base64Image }} />

        </View>


    }
    const _selfTest = () => {
        // this.setState({
        //     loading: true
        setLoading(true);

        () => {
            BluetoothEscposPrinter.selfTest(() => {
            });
        }

        // this.setState({
        //     loading: false
        // })
        setLoading(false);

    }

    const _scan = () => {
        // this.setState({
        //     loading: true
        // })
        setLoading(true);
        BluetoothManager.scanDevices()
            .then((s) => {
                var ss = s;
                var found = ss.found;
                try {
                    found = JSON.parse(found);//@FIX_it: the parse action too weired..
                } catch (e) {
                    //ignore
                }
                var fds = foundDs;
                if (found && found.length) {
                    fds = found;
                }
                // this.setState({
                //     foundDs: fds,
                //     loading: false
                // });
                setLoading(false);
                setFoundDs(fds);
            }, (er) => {
                // this.setState({
                //     loading: false
                // })
                setLoading(false);
                alert('error' + JSON.stringify(er));
            });
    }

    // console.log("printer data===", props.br, props.Empty, props.Id)
    return (

        <ScrollView style={styles.container}>
            {state1 == 2 ? <MainDashboard userid={props.Id} br={props.br} /> : state1 == 3 ? <EscPos name={name} boundAddress={boundAddress} br={props.br} Key={props.Id} Empty={props.Empty} /> :
                <>
                    <TouchableOpacity onPress={() => {

                        props.Empty();
                    }}
                        style={{ width: '10%', borderWidth: 1, height: '10%', justifyContent: 'center', margin: 10 }}>
                        <Text style={{ alignSelf: 'center' }}>Back</Text>
                    </TouchableOpacity>
                    <Text>{debugMsg}</Text>
                    <Text style={styles.title}>Blutooth Opended:{bleOpend ? "true" : "false"} <Text>Open BLE Before Scanning</Text> </Text>
                    <View>
                        <Switch value={bleOpend} onValueChange={(v) => {
                            // this.setState({
                            //     loading: true
                            // })
                            setLoading(true);
                            if (!v) {
                                BluetoothManager.disableBluetooth().then(() => {
                                    // this.setState({
                                    //     bleOpend: false,
                                    //     loading: false,
                                    //     foundDs: [],
                                    //     pairedDs: []
                                    // });
                                    setBleOpend(false);
                                    setLoading(false);
                                    setPairedDs([]);
                                    setFoundDs([]);

                                }, (err) => { alert(err) });

                            } else {
                                BluetoothManager.enableBluetooth().then((r) => {
                                    var paired = [];
                                    if (r && r.length > 0) {
                                        for (var i = 0; i < r.length; i++) {
                                            try {
                                                paired.push(JSON.parse(r[i]));
                                            } catch (e) {
                                                //ignore
                                            }
                                        }
                                    }
                                    // this.setState({
                                    //     bleOpend: true,
                                    //     loading: false,
                                    //     pairedDs: paired
                                    // })
                                    setBleOpend(true);
                                    setLoading(false);
                                    setPairedDs(paired);
                                }, (err) => {
                                    // this.setState({
                                    //     loading: false
                                    // })
                                    setLoading(false)
                                    alert(err)
                                });
                            }
                        }} />
                        <Button disabled={loading || !bleOpend} onPress={() => {
                            _scan();
                        }} title="Scan" />
                    </View>
                    <Text style={styles.title}>Connected:<Text style={{ color: "blue" }}>{!name ? 'No Devices' : name}</Text></Text>
                    <Text style={styles.title}>Found(tap to connect):</Text>
                    {loading ? (<ActivityIndicator animating={true} />) : null}
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        {
                            _renderRow(foundDs)
                        }
                    </View>
                    <Text style={styles.title}>Paired:</Text>
                    {loading ? (<ActivityIndicator animating={true} />) : null}
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        {
                            _renderRow(pairedDs)
                        }
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 30 }}>
                        <Button disabled={loading || !(bleOpend && boundAddress.length > 0)}
                            title="ESC/POS"
                            onPress={() => {
                                // props.navigator.push({
                                //     component: EscPos,
                                //     passProps: {
                                //         name: name,
                                //         boundAddress: boundAddress
                                //     }s
                                setState1(3);
                            }}
                        />
                        {/* <Button disabled={loading || !(bleOpend && boundAddress.length > 0)}
                            title="TSC" onPress={() => {
                                props.navigator.push({
                                    component: Tsc,
                                    passProps: {
                                        name: name,
                                        boundAddress: boundAddress
                                    }
                                })
                            }
                            } /> */}

                    </View>
                </>
            }
        </ScrollView>
    );
}


export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },

    title: {
        width: width,
        backgroundColor: "#eee",
        color: "#232323",
        paddingLeft: 8,
        paddingVertical: 4,
        textAlign: "left"
    },
    wtf: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    name: {
        flex: 1,
        textAlign: "left"
    },
    address: {
        flex: 1,
        textAlign: "right"
    },
    btn: {
        marginBottom: 8
    },
});
