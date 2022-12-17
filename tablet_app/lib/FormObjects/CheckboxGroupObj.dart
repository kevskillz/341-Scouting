import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

import '../Globals.dart';
import '../TitleTxt.dart';

class CheckboxGroupObj extends StatelessWidget {
  late TitleTxt txt;
  late FormBuilderFilterChip chk;

  CheckboxGroupObj(String label, String id, List<FormBuilderChipOption> options,
      {final Color activeColor = Colors.black}) {
    txt = TitleTxt(label);
    chk = FormBuilderFilterChip(
        name: id,
        options: options,
        selectedColor: activeColor,
        alignment: WrapAlignment.center,
        spacing: HORIZ_PADDING,
        decoration: const InputDecoration(
            helperText: "",
            contentPadding: EdgeInsets.symmetric(horizontal: HORIZ_PADDING)));
  }

  Text getText() {
    return txt.getText();
  }

  FormBuilderFilterChip getCheckboxGroup() {
    return chk;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [getText(), getCheckboxGroup()],
    );
  }
}
