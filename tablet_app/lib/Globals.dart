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

Map<String, dynamic> pitCache = {};
XFile? pic;
const double HORIZ_PADDING = 10.0;

String COMP = '';
final Map<String, FieldInfo> MATCH_FIELDS = {
  'MATCH_NUMBER': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'SCOUT_NAME': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.name),
  'TEAM': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'TEAM_COLOR': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[BR]$')),
      inputType: TextInputType.number),
  'HIGH_SCORED_AUTON': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'HIGH_MISSED_AUTON': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'LOW_SCORED_AUTON': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'LOW_MISSED_AUTON': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'TAXI': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'HIGH_SCORED_TELEOP': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'HIGH_MISSED_TELEOP': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'LOW_SCORED_TELEOP': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'LOW_MISSED_TELEOP': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'CLIMB_TIME': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'(^\-?\d*\.?\d*)')),
      inputType: const TextInputType.numberWithOptions(decimal: true)),
  'CLIMB_LEVEL': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.text),
};

final Map<String, FieldInfo> PIT_FIELDS = {
  'SCOUT_NAME': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.name),
  'TEAM': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'DRIVETRAIN': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.text),
  'MOTOR_COUNT': FieldInfo(
      formatter: FilteringTextInputFormatter.digitsOnly,
      inputType: TextInputType.number),
  'MOTOR_TYPE': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.text),
  'WIDTH_WHILE_HANGING': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'(^\-?\d*\.?\d*)')),
      inputType: const TextInputType.numberWithOptions(decimal: true)),
  'CAN_HIGH_HUB': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'CAN_LOW_HUB': FieldInfo(
      formatter: FilteringTextInputFormatter.allow(RegExp(r'^[0-1]$')),
      inputType: TextInputType.number),
  'CLIMB_LEVELS': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.text),
  'VISION_TYPE': FieldInfo(
      formatter: FilteringTextInputFormatter.deny(''),
      inputType: TextInputType.text),
};

String tabletColor = 'B';
int tabletNumber = 1;
