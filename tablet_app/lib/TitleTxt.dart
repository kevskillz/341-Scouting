import 'package:flutter/material.dart';

class TitleTxt {
  static const double FONT_SIZE = 25;
  Text txt = const Text("");
  TitleTxt(String text, {fontSize = FONT_SIZE}) {
    if (text.isNotEmpty) {
      txt = Text(
        text,
        style: TextStyle(fontSize: fontSize),
        textAlign: TextAlign.center,
      );
    }
  }

  Text getText() {
    return txt;
  }
}
