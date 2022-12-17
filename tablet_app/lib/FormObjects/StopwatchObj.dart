import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';

import '../Globals.dart';
import '../TitleTxt.dart';

class StopwatchObj extends StatefulWidget {
  String label;
  String id;
  GlobalKey<FormBuilderState> curKey;
  bool enabled;
  Stream<bool>? enabledController;
  StopwatchObj(this.label, this.id, this.curKey,
      {this.enabled = true, this.enabledController});

  @override
  State<StatefulWidget> createState() =>
      _StopwatchObj(label, id, curKey.currentState, enabled, enabledController);
}

class _StopwatchObj extends State<StopwatchObj> {
  @override
  void setState(fn) {
    if (mounted) {
      super.setState(fn);
    }
  }

  late TitleTxt txt;
  late Timer timer;
  late String id;
  late FormBuilderState? curKeyState;
  late final ElevatedButton resetButton;
  late final Stream<bool>? enabledController;

  bool running = false;
  bool showResume = false;
  bool enabled;

  final Stopwatch s = Stopwatch();

  static const Duration DELTA_TIME = Duration(milliseconds: 5);

  void updateEnabledState(bool state) {
    setState(() {
      if (state == false) {
        stopTimer();
        resetTimer();
        showResume = false;
        running = false;
      }
      enabled = state;
    });
  }

  @override
  void initState() {
    super.initState();
    enabledController?.listen((state) {
      updateEnabledState(state);
    });
  }

  _StopwatchObj(String label, this.id, this.curKeyState, this.enabled,
      this.enabledController) {
    txt = TitleTxt(label);
    resetButton = ElevatedButton(
        onPressed: () {
          if (!enabled) return;

          setState(() {
            stopTimer();
            resetTimer();
            showResume = false;
            running = false;
          });
        },
        child: const Text("Reset"));
  }

  void startTimer() {
    s.start();
    timer = Timer.periodic(DELTA_TIME, (_) {
      setState(() {
        Duration watch = s.elapsed;
        curKeyState!.fields[id]!.didChange((watch.inSeconds.toDouble() +
                (watch.inMilliseconds.toDouble().remainder(1000.0) / 1000.0))
            .toStringAsFixed(2));
        curKeyState!.save();
      });
    });
  }

  void resetTimer() {
    setState(() {
      curKeyState!.fields[id]!.didChange("0.00");
      curKeyState!.save();
    });
    s.reset();
  }

  void stopTimer() {
    if (running) {
      s.stop();
      timer.cancel();
    }
  }

  ElevatedButton buildStartStopButton() {
    return ElevatedButton(
        onPressed: () {
          if (!enabled) return;
          setState(() {
            if (running) {
              stopTimer();
              showResume = true;
            } else {
              startTimer();
              showResume = false;
            }

            running = !running;
          });
        },
        child: showResume
            ? const Text("Resume")
            : running
                ? const Text("Stop")
                : const Text("Start"));
  }

  FormBuilderTextField buildTimerView() {
    if (!enabled) {
      return FormBuilderTextField(
        name: id,
        initialValue: "0.00",
        readOnly: true,
        keyboardType: const TextInputType.numberWithOptions(decimal: true),
        textAlign: TextAlign.center,
        style: const TextStyle(color: Color.fromARGB(120, 158, 158, 158)),
        decoration: const InputDecoration(
            helperText: "Read Only",
            contentPadding: EdgeInsets.symmetric(horizontal: HORIZ_PADDING)),
        inputFormatters: [
          FilteringTextInputFormatter.allow(RegExp(r'(^\-?\d*\.?\d*)'))
        ],
      );
    }
    return FormBuilderTextField(
      name: id,
      initialValue: "0.00",
      readOnly: false,
      keyboardType: const TextInputType.numberWithOptions(decimal: true),
      textAlign: TextAlign.center,
      decoration: const InputDecoration(
          helperText: "Modify",
          contentPadding: EdgeInsets.symmetric(horizontal: HORIZ_PADDING)),
      inputFormatters: [
        FilteringTextInputFormatter.allow(RegExp(r'(^\-?\d*\.?\d*)'))
      ],
    );
  }

  Text getText() {
    return txt.getText();
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Expanded(flex: 5, child: resetButton),
        const Spacer(flex: 1),
        Expanded(
          flex: 5,
          child: buildTimerView(),
        ),
        const Spacer(flex: 1),
        Expanded(
          flex: 5,
          child: buildStartStopButton(),
        ),
      ],
    );
  }
}
