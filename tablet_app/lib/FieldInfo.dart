import 'package:flutter/services.dart';

class FieldInfo {
  TextInputFormatter formatter;
  TextInputType inputType;
  bool enabled;
  FieldInfo(
      {required this.formatter, required this.inputType, this.enabled = true});
}
