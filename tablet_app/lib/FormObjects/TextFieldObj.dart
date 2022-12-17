import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

import '../FieldInfo.dart';
import '../Globals.dart';
import '../TitleTxt.dart';

class TextFieldObj extends StatelessWidget {
  late FormBuilderTextField textField;
  late TitleTxt txt;

  TextFieldObj(
    String label,
    String id,
    FieldInfo typeRestrictions, {
    Function(dynamic)? onChanged,
    String? initalValue,
    double? fontSize = TitleTxt.FONT_SIZE,
    TextEditingController? controller,
  }) {
    txt = TitleTxt(label, fontSize: fontSize);
    textField = FormBuilderTextField(
      controller: controller,
      name: id,
      keyboardType: typeRestrictions.inputType,
      decoration: InputDecoration(
        helperText: "",
        contentPadding: const EdgeInsets.symmetric(horizontal: HORIZ_PADDING),
        border: const OutlineInputBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(10.0),
          ),
        ),
        hintText: label,
      ),
      validator: (value) {
        if (value == null || value == '') {
          return "Enter value";
        }
        return null;
      },
      inputFormatters: [typeRestrictions.formatter],
      onChanged: onChanged,
      initialValue: initalValue,
      enabled: typeRestrictions.enabled,
    );
  }

  FormBuilderTextField getTextField() {
    return textField;
  }

  Text getText() {
    return txt.getText();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [getText(), getTextField()],
    );
  }
}
