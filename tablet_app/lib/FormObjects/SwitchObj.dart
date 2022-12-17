import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

import '../Globals.dart';

class SwitchObj extends StatelessWidget {
  late FormBuilderSwitch _switch;
  late dynamic trueVal = true;

  SwitchObj(
    String label,
    String id, {
    final Color activeColor = Colors.black,
    final Color inactiveColor = Colors.white,
    final Color activeColorCircle = const Color.fromARGB(255, 189, 189, 189),
    final Color inactiveColorCircle = Colors.black87,
    final bool enabled = true,
    final Function(bool?)? onChanged,
  }) {
    _switch = FormBuilderSwitch(
      name: id,
      title: Text(label),
      contentPadding: const EdgeInsets.symmetric(horizontal: HORIZ_PADDING),
      initialValue: false,
      activeTrackColor: activeColor,
      inactiveTrackColor: inactiveColor,
      inactiveThumbColor: inactiveColorCircle,
      activeColor: activeColorCircle,
      enabled: enabled,
      decoration: InputDecoration(
          helperText: enabled ? "" : "Read Only",
          contentPadding:
              const EdgeInsets.symmetric(horizontal: HORIZ_PADDING)),
    );
  }

  FormBuilderSwitch getSwitch() {
    return _switch;
  }

  @override
  Widget build(BuildContext context) {
    return getSwitch();
  }
}
