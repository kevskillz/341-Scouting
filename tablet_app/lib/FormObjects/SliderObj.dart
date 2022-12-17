import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

import '../Globals.dart';
import '../TitleTxt.dart';

class SliderObj extends StatelessWidget {
  late TitleTxt txt;
  late FormBuilderSlider slider;

  SliderObj(
    String label,
    String id,
    final double min,
    final double max, {
    final int? discreteDivisions,
    double? initialVal,
    Function(dynamic)? onChanged,
  }) {
    txt = TitleTxt(label);
    initialVal = initialVal ?? min;
    slider = FormBuilderSlider(
      name: id,
      min: min,
      max: max,
      initialValue: initialVal,
      divisions: discreteDivisions,
      decoration: const InputDecoration(
          contentPadding: EdgeInsets.symmetric(horizontal: HORIZ_PADDING)),
      activeColor: const Color.fromARGB(255, 103, 107, 140),
      inactiveColor: const Color.fromARGB(255, 155, 155, 155),
    );
  }

  Text getText() {
    return txt.getText();
  }

  FormBuilderSlider getSlider() {
    return slider;
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [getText(), getSlider()],
    );
  }
}
