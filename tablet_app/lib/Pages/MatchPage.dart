// ignore: file_names
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:mobile_sct_app/FormObjects/RadioGroup.dart';
import 'package:mobile_sct_app/Globals.dart';
import 'package:mobile_sct_app/QRProcess.dart';
import 'package:mobile_sct_app/TBAQuery.dart';

import '../CustomIcons.dart';
import '../FormObjects/ScoringTable.dart';
import '../UIFunctions.dart';
import '../FormObjects/CheckboxObj.dart';
import '../FormObjects/CounterObj.dart';
import '../FormObjects/StopwatchObj.dart';
import '../FormObjects/TextFieldObj.dart';
import '../NavigationDrawer.dart';
import 'QRPage.dart';

class MatchPage extends StatefulWidget {
  const MatchPage({super.key});

  @override
  State<MatchPage> createState() => _MatchPage();
}

class _MatchPage extends State<MatchPage> with TickerProviderStateMixin {
  late TabController _tabController;
  final List<GlobalKey<FormBuilderState>> _keys = [
    GlobalKey<FormBuilderState>(),
    GlobalKey<FormBuilderState>(),
    GlobalKey<FormBuilderState>()
  ];

  bool enableTimer = true;
  bool resetCall = false;

  static const pageLabel = ["Match Info", "Autonomous", "Teleop"];

  final StreamController<bool> _validTimerController =
      StreamController<bool>.broadcast();

  @override
  void initState() {
    super.initState();

    _tabController = TabController(length: 3, vsync: this);
    _tabController.addListener(() {
      hideKeyboard(context);
      if (_tabController.index >= 1) {
        MatchStarted = true;
      }
      if (!resetCall) {
        try {
          _keys[_tabController.previousIndex].currentState!.save();
          matchCache[_tabController.previousIndex] = Map<String, dynamic>.from(
              _keys[_tabController.previousIndex].currentState!.value);
        } catch (e) {}
      }

      setState(() {
        try {
          _keys[_tabController.index]
              .currentState!
              .patchValue(matchCache[_tabController.index]);
          _keys[_tabController.index].currentState!.save();
          _keys[_tabController.index].currentState!.validate();

          resetCall = false;
        } catch (e) {}
      });
    });
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavigationDrawer(
        onPageTap: () {
          _keys[_tabController.index].currentState!.save();
          matchCache[_tabController.index] = Map<String, dynamic>.from(
              _keys[_tabController.index].currentState!.value);
        },
      ),
      appBar: AppBar(
        centerTitle: true,
        title: Text(
          '${pageLabel[_tabController.index]} // ${tabletColor == 'B' ? 'Blue' : 'Red'} $tabletNumber',
          style: TextStyle(color: tabletColor == 'B' ? BLUE_TEAM : RED_TEAM),
        ),
        toolbarHeight: kToolbarHeight / 2,
        bottom: TabBar(
          controller: _tabController,
          tabs: const <Widget>[
            Tab(
              icon: Icon(CustomIcons.user_edit),
            ),
            Tab(
              icon: Icon(CustomIcons.robot_arm),
            ),
            Tab(
              icon: Icon(CustomIcons.gamepad),
            ),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          // user
          FormBuilder(
            key: _keys[0],
            initialValue: matchCache[0],

            autovalidateMode: AutovalidateMode.always,
            // ignore: prefer_const_literals_to_create_immutables

            child: SingleChildScrollView(
              child: Column(
                children: [
                  Row(
                    children: <Widget>[
                      Expanded(
                          flex: 1,
                          child: TextFieldObj(
                            "Match Number",
                            "MatchNumber",
                            MATCH_FIELDS["MatchNumber"]!,
                            onChanged: (val) async {
                              if (val == null || int.tryParse(val) == null) {
                                return;
                              }
                              getTeam(tabletColor, tabletNumber, int.parse(val))
                                  .then(
                                      (team) => _keys[0]
                                          .currentState!
                                          .fields["TEAM"]!
                                          .didChange(team.toString()),
                                      onError: (err) {
                                if (err is StateError) {
                                  showSnackBar(context,
                                      "No team found for that match number");
                                }
                              });
                            },
                          )),
                      Expanded(
                        flex: 1,
                        child: TextFieldObj(
                          "Team Number",
                          "TeamName",
                          MATCH_FIELDS["TeamName"]!,
                        ),
                      ),
                    ],
                  ),
                  TextFieldObj(
                    "Scout Name",
                    "ScoutName",
                    MATCH_FIELDS["ScoutName"]!,
                  ),
                  ElevatedButton(
                      onPressed: () {
                        _tabController.animateTo(_tabController.index + 1);
                      },
                      child: const Text("Next"))
                ],
              ),
            ),
          ),
          // auton
          FormBuilder(
            key: _keys[1],
            initialValue: matchCache[1],

            autovalidateMode: AutovalidateMode.always,
            // ignore: prefer_const_literals_to_create_immutables

            child: SingleChildScrollView(
              child: Column(
                children: [
                  Row(
                    children: <Widget>[
                      ScoringTable(isAuto: true),
                    ],
                  ),
                  Row(
                    children: <Widget>[
                      Expanded(
                        flex: 1,
                        child: CounterObj("Cones Intaked", "AutoConesIntaked"),
                      ),
                      Expanded(
                        flex: 1,
                        child: CounterObj("Cubes Intaked", "AutoCubesIntaked"),
                      ),
                    ],
                  ),
                  // CheckboxObj("Mobility", "Mobility"),
                 Row(
                    children: <Widget>[
                      Expanded(child: 
                 RadioGroupObj(
                    "Mobility",
                    "Mobility",
                    const [
                       FormBuilderChipOption(value: "Yes"),
                      FormBuilderChipOption(value: "No")
                    ]
                  ), 
                      ),
                      Expanded(child: 
                  RadioGroupObj(
                    "Charging Station",
                    "AutoDockedState",
                    const [
                      FormBuilderChipOption(value: "None"),
                      FormBuilderChipOption(value: "Docked"),
                      FormBuilderChipOption(value: "Engaged")
                    ],
                  )
                      )
                  ])
                ],
              ),
            ),
          ),
          // teleop
          FormBuilder(
            key: _keys[2],
            initialValue: matchCache[2],

            autovalidateMode: AutovalidateMode.always,
            // ignore: prefer_const_literals_to_create_immutables

            child: SingleChildScrollView(
              child: Column(
                children: [
                  Row(
                    children: <Widget>[
                      ScoringTable(isAuto: false),
                    ],
                  ),
                  Row(
                    children: <Widget>[
                      Expanded(
                        flex: 1,
                        
                        child: CounterObj("Cones Intaked", "TeleConesIntaked"),
                      ),
                      Expanded(
                        flex: 1,
                        child: CounterObj("Cubes Intaked", "TeleCubesIntaked"),
                      ),
                    ],
                  ),
                  Row(
                    children: <Widget>[
                      Expanded(child:
                  RadioGroupObj(
                    "Charging Station",
                    "TeleDockedState",
                    const [
                      FormBuilderChipOption(value: "None"),
                      FormBuilderChipOption(value: "Parked"),
                      FormBuilderChipOption(value: "Docked"),
                      FormBuilderChipOption(value: "Engaged")
                    ],
                  ),
                      ),
                      Expanded(child: 
                  ElevatedButton(
                      onPressed: () {
                        MatchStarted = false;
                        _keys[2].currentState!.save();
                        matchCache[2] = Map<String, dynamic>.from(
                            _keys[2].currentState!.value);
                        bool isValid = true;
                        for (int i = 0; i < 3; i++) {
                          if (matchCache[i].containsValue(null) ||
                              matchCache[i].containsValue('') ||
                              matchCache[i].isEmpty) {
                            if (matchCache[i].isEmpty) {
                              showSnackBar(context,
                                  "Make sure you filled out page ${i + 1}");
                            } else {
                              showSnackBar(context, "Fill all fields");
                            }
                            _tabController.animateTo(i);
                            isValid = false;
                            break;
                          }
                        }
                        if (isValid) {
                          addEntry(<String, dynamic>{
                            for (var map in matchCache) ...map
                          }, true);
                          matchCache[1].clear();
                          matchCache[2].clear();
                          String name = matchCache[0]["ScoutName"];
                          matchCache[0].clear();
                          matchCache[0]["ScoutName"] = name;
                          resetCall = true;

                          TABLE_AUTO = List.generate(
                              3, (_) => List.generate(9, (_) => "empty"));
                          TABLE_TELEOP = List.generate(
                              3, (_) => List.generate(9, (_) => "empty"));

                          showSnackBar(context, "Added QR Code!",
                              action: SnackBarAction(
                                  label: "Go to QR Codes",
                                  textColor:
                                      const Color.fromRGBO(196, 225, 255, 0.8),
                                  onPressed: () => Navigator.of(context)
                                      .pushReplacement(MaterialPageRoute(
                                          builder: (ctx) => QRPage()))));
                          _tabController.animateTo(0);
                        }
                      },
                      child: const Text("Submit"))
                      )])
                      
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
