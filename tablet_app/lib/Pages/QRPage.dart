import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:mobile_sct_app/NavigationDrawer.dart';
import 'package:qr_flutter/qr_flutter.dart';

import '../FieldInfo.dart';
import '../FormObjects/TextFieldObj.dart';
import '../Globals.dart';
import '../LocalDataHandler.dart';

class QRWrapper extends StatefulWidget {
  Map<String, dynamic> dataMap;
  Function(QRWrapper) deleteCallback;
  int id;
  GlobalKey<FormBuilderState> stateKey;
  late final Map<String, FieldInfo> FIELDS;
  final bool isMatchQR;
  QRWrapper(
      {required this.dataMap,
      required this.id,
      required this.deleteCallback,
      required this.stateKey,
      required this.isMatchQR}) {
    FIELDS = isMatchQR ? MATCH_FIELDS : PIT_FIELDS;
  }

  @override
  State<StatefulWidget> createState() => _QRWrapper();
}

class _QRWrapper extends State<QRWrapper> {
  late String data;
  void processRawData() {
    List<String> orderedData = [];
    for (String key in widget.FIELDS.keys) {
      orderedData.add(widget.dataMap[key].toString());
    }
    data = orderedData.join(SEP);
  }

  final List cols = [];

  @override
  void initState() {
    super.initState();
    for (String element in widget.FIELDS.keys) {
      cols.add({'title': element, 'key': element});
    }
  }

  @override
  Widget build(BuildContext context) {
    processRawData();
    List<Widget> res = [];
    int i = 0;

    for (String key in widget.FIELDS.keys) {
      res.add(Container(
          padding: const EdgeInsets.all(8.0),
          color: Colors.grey[500 + (i * 100) % 500]!,
          child: TextFieldObj(
            key,
            key,
            widget.FIELDS[key]!,
            initalValue: widget.dataMap[key].toString(),
            onChanged: (value) {
              if (value == null || value == '') {
                return;
              }
              if (widget.stateKey.currentState!.saveAndValidate()) {
                setState(() {
                  if (widget.isMatchQR) {
                    rawMatchQRData[widget.id] =
                        widget.dataMap = widget.stateKey.currentState!.value;
                    saveMatchQRCodes();
                  } else {
                    rawPitQRData[widget.id] =
                        widget.dataMap = widget.stateKey.currentState!.value;
                    savePitQRCodes();
                  }
                });
              }
            },
            fontSize: 8.5,
          )));
      ++i;
    }
    QrImage q = QrImage(
      data: data,
      size: 200.0,
      padding: EdgeInsets.zero,
      backgroundColor: Colors.white,
    );
    return Column(
      children: <Widget>[
        Expanded(
            flex: 10,
            child: Row(
              children: [
                Expanded(
                    flex: 3,
                    child: GestureDetector(
                      child: Hero(
                          tag: 'imageHero',
                          child: FittedBox(
                              fit: BoxFit.contain,
                              alignment: Alignment.center,
                              child: SizedBox(
                                child: q,
                              ))),
                      onTap: () {
                        Navigator.push(context, MaterialPageRoute(builder: (_) {
                          return _EnlargedQRCode(q);
                        }));
                      },
                    )),
                const Spacer(flex: 1),
                Expanded(
                    flex: 3,
                    child: ElevatedButton(
                        onPressed: () {
                          widget.deleteCallback(widget);
                        },
                        child: const Text("Delete")))
              ],
            )),
        const Spacer(flex: 1),
        Expanded(
            flex: 10,
            child: FormBuilder(
                key: widget.stateKey,
                child: GridView.builder(
                  clipBehavior: Clip.hardEdge,
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 3,
                    crossAxisSpacing: 5,
                    mainAxisSpacing: 10,
                  ),
                  primary: false,
                  padding:
                      const EdgeInsets.symmetric(horizontal: HORIZ_PADDING),
                  itemBuilder: (context, idx) {
                    return res[idx];
                  },
                  itemCount: res.length,
                ))),
      ],
    );
  }
}

class _EnlargedQRCode extends StatelessWidget {
  QrImage q;
  _EnlargedQRCode(this.q);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GestureDetector(
        child: Center(
            child: Hero(
                tag: 'imageHero',
                child: SizedBox.expand(
                    child: Container(
                        padding: const EdgeInsets.all(20.0),
                        color: Color.fromARGB(255, 255, 255, 255),
                        child: FittedBox(
                            fit: BoxFit.contain,
                            alignment: Alignment.center,
                            child: SizedBox(
                              width: 600,
                              height: 600,
                              child: q,
                            )))))),
        onTap: () {
          Navigator.pop(context);
        },
      ),
    );
  }
}

class QRCarousel extends StatefulWidget {
  bool isMatchQR;
  QRCarousel({required this.isMatchQR});

  @override
  State<StatefulWidget> createState() => _QRCarousel();
}

class _QRCarousel extends State<QRCarousel> {
  Widget buildCarousel() {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Text(
          '${widget.isMatchQR ? rawMatchQRData.length : rawPitQRData.length} to Scan',
          style: const TextStyle(fontSize: 18),
        ),
        Expanded(
          // you may want to use an aspect ratio here for tablet support

          child: PageView.builder(
            itemCount:
                widget.isMatchQR ? rawMatchQRData.length : rawPitQRData.length,
            // store this controller in a State to save the carousel scroll position
            controller: PageController(),
            physics: const BouncingScrollPhysics(),
            itemBuilder: (BuildContext context, int itemIndex) {
              return _buildCarouselItem(itemIndex);
            },
          ),
        )
      ],
    );
  }

  void deletedCallback(QRWrapper toDelete) {
    if (widget.isMatchQR) {
      setState(() {
        rawMatchQRData.removeAt(toDelete.id);
        saveMatchQRCodes();
      });
    } else {
      setState(() {
        rawPitQRData.removeAt(toDelete.id);
        savePitQRCodes();
      });
    }
  }

  Widget _buildCarouselItem(int itemIndex) {
    final GlobalKey<FormBuilderState> key = GlobalKey<FormBuilderState>();

    return Padding(
        padding: const EdgeInsets.symmetric(horizontal: HORIZ_PADDING),
        child: QRWrapper(
          dataMap: widget.isMatchQR
              ? rawMatchQRData[itemIndex]
              : rawPitQRData[itemIndex],
          isMatchQR: widget.isMatchQR,
          id: itemIndex,
          deleteCallback: deletedCallback,
          stateKey: key,
        ));
  }

  @override
  Widget build(BuildContext context) {
    return buildCarousel();
  }
}

class QRPage extends StatefulWidget {
  @override
  State<QRPage> createState() => _QRPageState();
}

class _QRPageState extends State<QRPage> with TickerProviderStateMixin {
  late final TabController _tabController;
  static const pageLabel = ["Match", "Pit"];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            centerTitle: true,
            bottom: TabBar(
              controller: _tabController,
              tabs: const <Widget>[
                Tab(
                  child: Text("Match"),
                ),
                Tab(
                  child: Text("Pit"),
                )
              ],
            ),
            title: const Text("QR Codes")),
        drawer: NavigationDrawer(),
        // body: QRCarousel(),
        body: TabBarView(controller: _tabController, children: [
          QRCarousel(
            isMatchQR: true,
          ),
          QRCarousel(
            isMatchQR: false,
          )
        ]));
  }
}
