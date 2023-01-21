// ignore: must_be_immutable
import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:number_inc_dec/number_inc_dec.dart';

import '../Globals.dart';
import '../TitleTxt.dart';

class CounterObj extends StatelessWidget {
  late TitleTxt txt;
  late FormBuilderField numberInput;

  CounterObj(
    String label,
    String id, {
    final color = Colors.black,
    final arrangement = ButtonArrangement.incRightDecLeft,
  }) {
    txt = TitleTxt(label);
    TextEditingController edit = TextEditingController();
    // numberInput = FormBuilderField<int>(
    //     name: id,
    //     initialValue: 0,
    //     onSaved: (newValue) => edit.text = newValue.toString(),
    //     onReset: () => edit.text = "0",
    //     builder: (FormFieldState<dynamic> field) {
    //       return Container(
    //         padding: const EdgeInsets.symmetric(horizontal: HORIZ_PADDING),
    //         child: NumberInputPrefabbed.leafyButtons(
    //           controller: edit,
    //           incDecBgColor: color,
    //           buttonArrangement: arrangement,
    //           min: 0,
    //           onChanged: (newValue) => field.didChange(newValue),
    //           onIncrement: (newValue) => field.didChange(newValue),
    //           onDecrement: (newValue) => field.didChange(newValue),
    //         ),
    //       );
    //     });
    numberInput = FormBuilderField<int>(
        name: id,
        initialValue: 0,
        onSaved: (newValue) => edit.text = newValue.toString(),
        onReset: () => edit.text = "0",
        builder: (FormFieldState<dynamic> field) {
          return Container(
              padding: const EdgeInsets.symmetric(horizontal: HORIZ_PADDING),
              child: NumberInputWithIncrementDecrement(
                numberFieldDecoration: InputDecoration(
                  border: InputBorder.none,
                ),
                style: TextStyle(fontSize: 40),
                widgetContainerDecoration: BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                    border: Border.all(
                      color: Colors.black,
                      width: 2,
                    )),
                incIconDecoration: BoxDecoration(
                  color: Colors.black,
                  borderRadius: BorderRadius.only(
                    bottomLeft: Radius.circular(10),
                  ),
                ),
                separateIcons: true,
                decIconDecoration: BoxDecoration(
                  color: Colors.black,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(10),
                  ),
                ),
                incIconSize: 100,
                decIconSize: 100,
                incIcon: Icons.plus_one,
                decIcon: Icons.exposure_neg_1,
                              controller: edit,
              incDecBgColor: color,
              buttonArrangement: arrangement,
              min: 0,
              onChanged: (newValue) => field.didChange(newValue),
              onIncrement: (newValue) => field.didChange(newValue),
              onDecrement: (newValue) => field.didChange(newValue),

              ));
        });
  }

  Text getText() {
    return txt.getText();
  }

  FormBuilderField getNumberInput() {
    return numberInput;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [getText(), getNumberInput()],
    );
  }
}
