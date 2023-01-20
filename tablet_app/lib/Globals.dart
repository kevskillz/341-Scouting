import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';

import 'FieldInfo.dart';

const String SEP = 'ｦ';

final Color RED_TEAM = Colors.red[200]!;
final Color BLUE_TEAM = Colors.blue[200]!;

List<dynamic> json = [];
// List<QRWrapper> qrCodes = [];
List<Map<String, dynamic>> rawMatchQRData = [];

List<Map<String, dynamic>> rawPitQRData = [];

List<Map<String, dynamic>> matchCache = [
  Map<String, dynamic>(),
  Map<String, dynamic>(),
  Map<String, dynamic>()
];

var TABLE_AUTO = List.generate(3, (_) => List.generate(9, (_) => "empty"));
var TABLE_TELEOP = List.generate(3, (_) => List.generate(9, (_) => "empty"));



Map<String, dynamic> casinoCache = {};
Map<String, dynamic> pitCache = {};
XFile? pic;
const double HORIZ_PADDING = 10.0;

bool MatchStarted = false;

String COMP = '';
final Map<String, FieldInfo> MATCH_FIELDS = {
  'MatchNumber': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'TeamName': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'ScoutName': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.name),
  'TeamColor': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[BR]$')),
      inputType: TextInputType.name),
  'Mobility': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'AutoConesIntaked': FieldInfo(
     formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'AutoCubesIntaked': FieldInfo(
     formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'TeleConesIntaked': FieldInfo(
     formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'TeleCubesIntaked': FieldInfo(
     formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'AutoDockedState': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.name),
   'TeleDockedState': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.name),   
  'Auto1': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'Auto2': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto3': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto4': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto5': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto6': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto7': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto8': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto9': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto10': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto11': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto12': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto13': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto14': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto15': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto16': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto17': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto18': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto19': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto20': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto21': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto22': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto23': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto24': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto25': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto26': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Auto27': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele1': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'Tele2': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele3': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele4': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele5': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele6': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele7': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele8': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele9': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele10': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele11': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele12': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele13': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele14': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele15': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele16': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele17': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele18': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele19': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele20': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele21': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele22': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele23': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele24': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele25': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele26': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'Tele27': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'BET_COLOR': FieldInfo(
      enabled: false,
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[BR]$')),
      inputType: TextInputType.name),
'BET_AMOUNT': FieldInfo(
      enabled: false,
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
'OVER_UNDER': FieldInfo(
      enabled: false,
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.numberWithOptions()),
};

final Map<String, FieldInfo> PIT_FIELDS = {
  'ScoutName': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.name),
  'TeamName': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'Drivetrain': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.text),
  'RobotWidth': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: const TextInputType.numberWithOptions(decimal: true)),
  'RobotLength': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: const TextInputType.numberWithOptions(decimal: true)),
  'StationRobotWidth': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: const TextInputType.numberWithOptions(decimal: true)),
  'RobotVision': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.name),
  'AutoMobility': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'AutoStationDrive': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.name),
  'AutoPiecesScored': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'CubeGround': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'CubeShelf': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'CubePortal': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'ConeGround': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'ConeShelf': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'ConePortal': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'SideConeGround': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'SideConeShelf': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'SideConePortal': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'TeleCubeScoreLevel': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.text),
  'TeleConeScoreLevel': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.text),
  'EndStationDrive': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.text),
  'NotableFeat': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.text)
};

String tabletColor = 'B';
int tabletNumber = 1;
