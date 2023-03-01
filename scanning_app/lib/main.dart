import 'dart:async' show Future;
import 'dart:developer';
import 'dart:io';
import 'dart:isolate';
import 'package:http/http.dart' as http;

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:qrolo/qrolo.dart';
import 'dart:async';
import 'package:flutter/material.dart';
import 'dart:html';

final Storage _localStorage = window.localStorage;
List all = [];
int stored = 0;
int pitCounter = 0;
const String SEP = 'ｦ';
List pits = [];
final String compName = "Hatboro";

void main() {
  String? mtch = _localStorage["MatchData"];
  // String? pit = _localStorage["PitData"];

  String? mtchCnt = _localStorage["MatchCounter"];
  // String? pitCnt = _localStorage["PitCounter"];

  if (mtch != null) {
    List<String> matches = mtch.split("Ω");
    for (int i = 0; i < matches.length; i++) {
      all.add(matches[i].substring(compName.length+1));
    }
  }
  if (mtchCnt != null) {
    stored = int.parse(mtchCnt);
  }
  // if (pitCnt != null) {
  //   pitCounter = int.parse(pitCnt);
  // }
  // if (pit != null) {
  //   pits = pit.split("Ω");
  // }
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  String _platformVersion = 'Unknown';
  String? scannedQRCode;
  final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

  @override
  void initState() {
    super.initState();
    initPlatformState();
  }

  // Platform messages are asynchronous, so we initialize in an async method.
  Future<void> initPlatformState() async {
    String? platformVersion;
    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      platformVersion = await QRolo.platformVersion;
    } on PlatformException {
      platformVersion = 'Failed to get platform version.';
    }

    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) return;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: MyHomePage(
      title: 'QRolo QR scanner app porject',
    ));
  }

  void testAlert(BuildContext context) {
    var alert = AlertDialog(
      title: Text("Test"),
      content: Text("Done..!"),
    );

    showDialog<String?>(
        context: context,
        builder: (BuildContext context) {
          return alert;
        });
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  StreamSubscription? connection;
  bool isOnline = false;
  String _platformVersion = 'Unknown';
  String? scannedQRCode;
  String? code;
  Timer? timer;

  // Future<List<dynamic>> sourcesF;
  Future<bool> camAvailableF = QRolo.isCameraAvailable();

  void updateConnectionState() async {
    // var url = Uri.parse('http://httpbin.org/ip');
   var url = Uri.parse('http://scouting.team341.com:3030/match_fields');
    var response = await http.get(url).timeout(const Duration(seconds: 2),
        onTimeout: () => http.Response('Error', 408));

    if (response.statusCode != 408) {
      isOnline = true;
    } else
      isOnline = false;
  }

  void pushMatch(String data) async {
    print('http://www.scouting.team341.com:3030/add_match/' +
        "Ω" +
        "/" +
        SEP +
        "/" +
        data);
    var url = Uri.parse('http://www.scouting.team341.com:3030/add_match/' +
        "Ω" +
        "/" +
        SEP +
        "/" +
        data);
    var response = await http.get(url).timeout(const Duration(seconds: 1),
        onTimeout: () => http.Response('Error', 408));

    if (response.statusCode != 408) {
      isOnline = true;
      all.clear();

      _localStorage['MatchData'] = '';
    } else
      isOnline = false;
  }

  void pushPit(String data) async {
    var url = Uri.parse('http://www.scouting.team341.com:3030/add_pit/' +
        "Ω" +
        "/" +
        SEP +
        "/" +
        data);
    var response = await http.get(url).timeout(const Duration(seconds: 1),
        onTimeout: () => http.Response('Error', 408));

    if (response.statusCode != 408) {
      isOnline = true;
    } else
      isOnline = false;
  }

  // html.ImageElement img;
  @override
  void initState() {
    timer = Timer.periodic(const Duration(seconds: 1), (_) {
      setState(() {
        updateConnectionState();
      });
    });

    super.initState();
    initPlatformState();
  }

  // Platform messages are asynchronous, so we initialize in an async method.
  Future<void> initPlatformState() async {
    String? platformVersion;

    // Platform messages may fail, so we use a try/catch PlatformException.
    try {
      platformVersion = await QRolo.platformVersion;
    } on PlatformException {
      platformVersion = 'Failed to get platform version.';
    } on Exception catch (err) {
      platformVersion = err.toString();
    }

    // If the widget was removed from the tree while the asynchronous platform
    // message was in flight, we want to discard the reply rather than calling
    // setState to update our non-existent appearance.
    if (!mounted) return;

    setState(() {
      _platformVersion = platformVersion ?? 'Unknown';
    });
  }

  List arr = List.filled(8, "");
  List<String> names = [
    "Blue Leader",
    "Blue 1",
    "Blue 2",
    "Blue 3",
    "Red Leader",
    "Red 1",
    "Red 2",
    "Red 3"
  ];

  void _openScan(BuildContext context, int num) async {
    final code = await showDialog<String?>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          insetPadding: EdgeInsets.all(5),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(10.0),
            ),
          ),
          title: const Text('Scan QR Code'),
          content: Container(
            width: 640,
            height: 480,
            child: QRolo(),
          ),
        );
      },
    );
    if (num == 8) {
      if (code != null && code != '') {
        pitCounter++;
        pits.add(code);

        // _localStorage["PitCounter"] = pitCounter.toString();
      }
      // String pitInfo = "";

      // for (int l = 0; l < pits.length; l++) {
      //   pitInfo += compName + SEP + pits[l];
      //   if (l != pits.length - 1) pitInfo += "Ω";
      // }
      // _localStorage["PitData"] = pitInfo;
    } else {
      arr[num] = code;
    }
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      scannedQRCode = code;
      if (!names[num].endsWith("✔️") && arr[num] != null) {
        names[num] += "✔️";
      }
    });
  }

  void submit() {
    print(arr);
    for (var ele in arr) {
      if (ele!="") all.add(ele);
    }
    print("here"+all.toString() );
    arr = List.filled(8, "");
    bool good = false;
    for (int i = 0; i < 8; i++) {
      if (names[i].endsWith("✔️")) {
        names[i] = names[i].replaceAll("✔️", "");
        good=true;
      }
    }
    if (good) stored++;
    _localStorage["MatchCounter"] = stored.toString();
    String info = "";
    for (int i = 0; i < all.length; i++) {
      // List art = [];
      // for (int j = 0; j < all[i].length; j++) {
      //   if (all[i][j] != "") art.add(all[i][j]);
      // }
      // print(art);
      
      info += compName + SEP + all[i];

      if (i != all.length - 1) info += "Ω";
    }
    if (_localStorage['MatchData'] == null || _localStorage['MatchData'] == '') _localStorage["MatchData"] = info;
    else _localStorage['MatchData'] = _localStorage['MatchData']! + "Ω" + info;
    setState(() {});
  }

  void sync() {
    submit();
    stored = 0;
    
    _localStorage["MatchCounter"] = stored.toString();
    // String info = "";
    String pitInfo = "";
    // for (int i = 0; i < all.length; i++) {
    //   List art = [];
    //   for (int j = 0; j < all[i].length; j++) {
    //     if (all[i][j] != "") art.add(all[i][j]);
    //   }
    //   info += compName + SEP;

    //   for (int k = 0; k < art.length; k++) {
    //     info += art[k];
    //     if (k != art.length - 1) info += "Ω";
    //   }
    // }

    for (int l = 0; l < pits.length; l++) {
       pitInfo += compName + SEP;
      pitInfo += pits[l];
      if (l != pits.length - 1) pitInfo += "Ω";
    }
    print("HEHEHEHE" + pitInfo);
    pushPit(pitInfo);
    pushMatch(_localStorage["MatchData"].toString());
    pits = [];
    pitCounter = 0;
    // _localStorage["PitCounter"] = pitCounter.toString();
  }

  void clear(int num) {
    setState(() {
      arr[num] = "";
      if (names[num].endsWith("✔️"))
        names[num] = names[num].replaceAll("✔️", "");
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color.fromARGB(255, 214, 205, 126),
        appBar: AppBar(
            title: const Text('Daisy Scouting QR Scanning App'),
            foregroundColor: Colors.white,
            backgroundColor: Color.fromARGB(255, 8, 93, 163)),
        body: SingleChildScrollView(
          child: Column(
            children: [
              SizedBox(height: 10),
              // ! FIXME: Need FutureBuilder for the popup to work
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Wrap(
                      spacing:
                          20, // to apply margin in the main axis of the wrap
                      runSpacing:
                          20, // to apply margin in the cross axis of the wrap
                      direction: Axis.vertical,
                      children: [
                        Row(children: [
                          // ElevatedButton(
                          //   style: ElevatedButton.styleFrom(
                          //     primary: Colors.blue,
                          //     onPrimary: Colors.white,
                          //     shape: RoundedRectangleBorder(
                          //         borderRadius: BorderRadius.circular(32.0)),
                          //     minimumSize: Size(200, 100), //////// HERE
                          //   ),
                          //   child: Text(names[0]),
                          //   onPressed: () {
                          //     _openScan(context, 0);
                          //   },
                          // ),
                          // ElevatedButton(
                          //   style: ElevatedButton.styleFrom(
                          //     primary: Colors.purple,
                          //     onPrimary: Colors.white,
                          //     shape: RoundedRectangleBorder(
                          //         borderRadius: BorderRadius.circular(32.0)),
                          //     minimumSize: Size(100, 100), //////// HERE
                          //   ),
                            // child: Text("Clear"),
                            // onPressed: () {
                            //   clear(0);
                            // },
                          // )
                        ]),
                        Row(children: [
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              primary: Colors.blue,
                              onPrimary: Colors.white,
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(32.0)),
                              minimumSize: Size(200, 100), //////// HERE
                            ),
                            child: Text(names[1]),
                            onPressed: () {
                              _openScan(context, 1);
                            },
                          ),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              primary: Colors.purple,
                              onPrimary: Colors.white,
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(32.0)),
                              minimumSize: Size(100, 100), //////// HERE
                            ),
                            child: Text("Clear"),
                            onPressed: () {
                              clear(1);
                            },
                          )
                        ]),
                        Row(children: [
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              primary: Colors.blue,
                              onPrimary: Colors.white,
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(32.0)),
                              minimumSize: Size(200, 100), //////// HERE
                            ),
                            child: Text(names[2]),
                            onPressed: () {
                              _openScan(context, 2);
                            },
                          ),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              primary: Colors.purple,
                              onPrimary: Colors.white,
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(32.0)),
                              minimumSize: Size(100, 100), //////// HERE
                            ),
                            child: Text("Clear"),
                            onPressed: () {
                              clear(2);
                            },
                          )
                        ]),
                        Row(children: [
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              primary: Colors.blue,
                              onPrimary: Colors.white,
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(32.0)),
                              minimumSize: Size(200, 100), //////// HERE
                            ),
                            child: Text(names[3]),
                            onPressed: () {
                              _openScan(context, 3);
                            },
                          ),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              primary: Colors.purple,
                              onPrimary: Colors.white,
                              shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(32.0)),
                              minimumSize: Size(100, 100), //////// HERE
                            ),
                            child: Text("Clear"),
                            onPressed: () {
                              clear(3);
                            },
                          )
                        ]),
                      ]),
                  Wrap(
                    spacing: 5, // to apply margin in the main axis of the wrap
                    runSpacing:
                        20, // to apply margin in the cross axis of the wrap
                    direction: Axis.vertical,
                    children: [
                      Image.asset(
                        'assets/images/logo.png',
                        height: 200,
                        width: 200,
                      ),
                      Text("Matches Stored: " + stored.toString()),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          primary: Colors.green,
                          onPrimary: Colors.white,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(32.0)),
                          minimumSize: Size(200, 100), //////// HERE
                        ),
                        child: Text("Submit"),
                        onPressed: () {
                          submit();
                        },
                      ),
                      Text("Connected: " + (isOnline ? "Yes" : "No")),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          primary: Colors.green,
                          onPrimary: Colors.white,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(32.0)),
                          minimumSize: Size(200, 100), //////// HERE
                        ),
                        child: Text("Sync"),
                        onPressed: !isOnline
                            ? null
                            : () {
                                sync();
                              },
                      ),
                      SizedBox(height: 75),
                      Text("Pits Stored: " + pitCounter.toString()),
                      ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          primary: Colors.orange,
                          onPrimary: Colors.white,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(32.0)),
                          minimumSize: Size(200, 100), //////// HERE
                        ),
                        child: Text("Pit"),
                        onPressed: () {
                          _openScan(context, 8);
                        },
                      ),
                    ],
                  ),
                  Wrap(
                    spacing: 20, // to apply margin in the main axis of the wrap
                    runSpacing:
                        20, // to apply margin in the cross axis of the wrap
                    direction: Axis.vertical,
                    children: [
                      Row(children: [
                        // ElevatedButton(
                        //   style: ElevatedButton.styleFrom(
                        //     primary: Colors.red,
                        //     onPrimary: Colors.white,
                        //     shape: RoundedRectangleBorder(
                        //         borderRadius: BorderRadius.circular(32.0)),
                        //     minimumSize: Size(200, 100), //////// HERE
                        //   ),
                        //   child: Text(names[4]),
                        //   onPressed: () {
                        //     _openScan(context, 4);
                        //   },
                        // ),
                        // ElevatedButton(
                        //   style: ElevatedButton.styleFrom(
                        //     primary: Colors.purple,
                        //     onPrimary: Colors.white,
                        //     shape: RoundedRectangleBorder(
                        //         borderRadius: BorderRadius.circular(32.0)),
                        //     minimumSize: Size(100, 100), //////// HERE
                        //   ),
                        //   child: Text("Clear"),
                        //   onPressed: () {
                        //     clear(4);
                        //   },
                        // )
                      ]),
                      Row(children: [
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            primary: Colors.red,
                            onPrimary: Colors.white,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(32.0)),
                            minimumSize: Size(200, 100), //////// HERE
                          ),
                          child: Text(names[5]),
                          onPressed: () {
                            _openScan(context, 5);
                          },
                        ),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            primary: Colors.purple,
                            onPrimary: Colors.white,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(32.0)),
                            minimumSize: Size(100, 100), //////// HERE
                          ),
                          child: Text("Clear"),
                          onPressed: () {
                            clear(5);
                          },
                        )
                      ]),
                      Row(children: [
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            primary: Colors.red,
                            onPrimary: Colors.white,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(32.0)),
                            minimumSize: Size(200, 100), //////// HERE
                          ),
                          child: Text(names[6]),
                          onPressed: () {
                            _openScan(context, 6);
                          },
                        ),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            primary: Colors.purple,
                            onPrimary: Colors.white,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(32.0)),
                            minimumSize: Size(100, 100), //////// HERE
                          ),
                          child: Text("Clear"),
                          onPressed: () {
                            clear(6);
                          },
                        )
                      ]),
                      Row(children: [
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            primary: Colors.red,
                            onPrimary: Colors.white,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(32.0)),
                            minimumSize: Size(200, 100), //////// HERE
                          ),
                          child: Text(names[7]),
                          onPressed: () {
                            _openScan(context, 7);
                          },
                        ),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            primary: Colors.purple,
                            onPrimary: Colors.white,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(32.0)),
                            minimumSize: Size(100, 100), //////// HERE
                          ),
                          child: Text("Clear"),
                          onPressed: () {
                            clear(7);
                          },
                        )
                      ]),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ));
  }
}
