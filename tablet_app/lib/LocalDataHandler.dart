// ignore_for_file: avoid_print

import 'dart:io';

import 'package:path_provider/path_provider.dart';

import 'Globals.dart';
import 'dart:convert' as convert;

Future<void> fetchLocalTBAData() async {
  Directory? dir = await getExternalStorageDirectory();
  File f = File('${dir?.path}/TBACache.json');
  if (await f.exists()) {
    String str = await f.readAsString();
    json = convert.jsonDecode(str) as List<dynamic>;
    if (json.isNotEmpty) {
      try {
        COMP = json[0]['event_key'];
      } catch (e) {}
    }
  }
}

Future<void> fetchLocalConfig() async {
  Directory? dir = await getExternalStorageDirectory();
  File f = File('${dir?.path}/config.json');
  if (await f.exists()) {
    String str = await f.readAsString();
    Map<String, dynamic> config =
        convert.jsonDecode(str) as Map<String, dynamic>;
    if (config.isNotEmpty) {
      tabletColor = config['tablet_color']!;
      tabletNumber = config['tablet_number']!;
    }
  }
}

void saveLocalTBAData() async {
  getExternalStorageDirectory().then((dir) {
    File f = File('${dir?.path}/TBACache.json');
    f.writeAsString(convert.jsonEncode(json));
  }, onError: (e) => print(e));
}

void saveLocalConfig() async {
  getExternalStorageDirectory().then((dir) {
    File f = File('${dir?.path}/config.json');
    f.writeAsString(convert.jsonEncode(
        {'tablet_color': tabletColor, 'tablet_number': tabletNumber}));
  });
}

void saveMatchQRCodes() async {
  getExternalStorageDirectory().then((dir) {
    File f = File('${dir?.path}/QRMatchCache.json');
    f.writeAsString(convert.jsonEncode(rawMatchQRData));
  }, onError: (e) => print(e));
}

Future<void> fetchMatchQRCodes() async {
  Directory? dir = await getExternalStorageDirectory();
  File f = File('${dir?.path}/QRMatchCache.json');
  if (await f.exists()) {
    String str = await f.readAsString();

    rawMatchQRData = List.from(convert.jsonDecode(str));
  }
}

void savePitQRCodes() async {
  getExternalStorageDirectory().then((dir) {
    File f = File('${dir?.path}/QRPitCache.json');
    f.writeAsString(convert.jsonEncode(rawPitQRData));
  }, onError: (e) => print(e));
}

Future<void> fetchPitQRCodes() async {
  Directory? dir = await getExternalStorageDirectory();
  File f = File('${dir?.path}/QRPitCache.json');
  if (await f.exists()) {
    String str = await f.readAsString();

    rawPitQRData = List.from(convert.jsonDecode(str));
  }
}

Future<void> savePitImage(int team) async {
  var dir = await getExternalStorageDirectory();
  String path = dir!.path;
  await Directory('$path/pitPics/').create(recursive: true);
  await pic!.saveTo('$path/pitPics/pic-$team.${pic!.name.split(".")[1]}');
}
