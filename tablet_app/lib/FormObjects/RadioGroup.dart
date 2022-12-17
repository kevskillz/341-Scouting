import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

import '../Globals.dart';
import '../TitleTxt.dart';

class RadioGroupObj extends StatelessWidget {
  late TitleTxt txt;
  late FormBuilderChoiceChip singleSel;

  RadioGroupObj(String label, String id, List<FormBuilderChipOption> options,
      {final Color activeColor = Colors.black,
      Function(dynamic)? onChanged,
      dynamic initialValue}) {
    txt = TitleTxt(label);
    singleSel = FormBuilderChoiceChip(
      name: id,
      alignment: WrapAlignment.center,
      options: options,
      selectedColor: activeColor,
      spacing: HORIZ_PADDING,
      decoration: const InputDecoration(
          helperText: "",
          contentPadding: EdgeInsets.symmetric(horizontal: HORIZ_PADDING)),
      validator: (value) {
        if (value == null) {
          return "Select one";
        }
        return null;
      },
      initialValue: initialValue,
      onChanged: onChanged,
    );
  }

  Text getText() {
    return txt.getText();
  }

  FormBuilderChoiceChip getSingleSelection() {
    return singleSel;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [getText(), getSingleSelection()],
    );
  }
}
