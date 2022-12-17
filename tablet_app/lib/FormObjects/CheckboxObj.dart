import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

class CheckboxObj extends StatelessWidget {
  late FormBuilderCheckbox checkbox;

  CheckboxObj(
    String label,
    String id, {
    final Color checkColor = Colors.white,
    final Color activeColor = Colors.black,
  }) {
    checkbox = FormBuilderCheckbox(
      name: id,
      title: Text(label),
      initialValue: false,
      checkColor: checkColor,
      activeColor: activeColor,
      controlAffinity: ListTileControlAffinity.leading,
    );
  }

  FormBuilderCheckbox getCheckbox() {
    return checkbox;
  }

  @override
  Widget build(BuildContext context) {
    return getCheckbox();
  }
}
