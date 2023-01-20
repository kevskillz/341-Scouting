// import 'dart:html';
import 'dart:typed_data';

import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile_sct_app/Globals.dart';
import 'package:mobile_sct_app/NavigationDrawer.dart';
import 'package:mobile_sct_app/QRProcess.dart';

import '../UIFunctions.dart';
import '../FormObjects/CheckboxGroupObj.dart';
import '../FormObjects/CheckboxObj.dart';
import '../FormObjects/RadioGroup.dart';
import '../FormObjects/SliderObj.dart';
import '../FormObjects/TextFieldObj.dart';
import '../LocalDataHandler.dart';
import 'QRPage.dart';
import 'TakePicPage.dart';

class PitPage extends StatefulWidget {
  @override
  State<PitPage> createState() => _PitPageState();
}

class _PitPageState extends State<PitPage> {
  final GlobalKey<FormBuilderState> _key = GlobalKey<FormBuilderState>();

  final ImagePicker _picker = ImagePicker();

  Widget img = const SizedBox.shrink();

  Future<void> retrieveLostData() async {
    final LostDataResponse response = await _picker.retrieveLostData();
    if (response.isEmpty) {
      return;
    }
    if (response.file != null) {
      pic = response.file;
    }
  }

  Future<Widget> loadImage() async {
    if (pic == null) {
      return const SizedBox.shrink();
    }
    await retrieveLostData();
    final Uint8List bytes = await pic!.readAsBytes();
    return Image(
      image: Image.memory(bytes).image,
      width: 100,
      fit: BoxFit.scaleDown,
    );
  }

  // Get a specific camera from the list of available cameras.
  late CameraDescription firstCamera;

  @override
  void initState() {
    super.initState();
    loadImage().then((value) {
      setState(() {
        img = value;
      });
    });
    availableCameras().then((value) {
      firstCamera = value.first;
    });
  }

  @override
  Widget build(BuildContext context) {
    //_key.currentState!.patchValue(pitCache);
    return Scaffold(
        appBar: AppBar(centerTitle: true, title: const Text("Pit Scouting")),
        drawer: NavigationDrawer(
          onPageTap: () {
            _key.currentState!.save();
            pitCache = Map<String, dynamic>.from(_key.currentState!.value);
          },
        ),
        body: FormBuilder(
            key: _key,
            initialValue: pitCache,
            autovalidateMode: AutovalidateMode.always,
            child: SingleChildScrollView(
                child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                TextFieldObj(
                  "Scout Name",
                  "ScoutName",
                  PIT_FIELDS["ScoutName"]!,
                ),
                TextFieldObj(
                  "Team",
                  "TeamName",
                  PIT_FIELDS["TeamName"]!,
                ),
                RadioGroupObj("Drivetrain", "Drivetrain", const [
                  FormBuilderChipOption(
                    value: "Tank",
                  ),
                  FormBuilderChipOption(
                    value: "Swerve",
                  ),
                  FormBuilderChipOption(
                    value: "Mecanum",
                  ),
                  FormBuilderChipOption(
                    value: "Other",
                  )
                ]),
                TextFieldObj(
                  "Robot Width With Bumpers (EXACT IN INCHES)",
                  "RobotWidth",
                  PIT_FIELDS["RobotWidth"]!,
                ),
                TextFieldObj(
                  "Robot Length With Bumpers (EXACT IN INCHES)",
                  "RobotLength",
                  PIT_FIELDS["RobotLength"]!,
                ),
                TextFieldObj(
                  "Robot Width On Charging Station With Bumpers (EXACT IN INCHES)",
                  "StationRobotWidth",
                  PIT_FIELDS["StationRobotWidth"]!,
                ),
                RadioGroupObj("Vision", "RobotVision", const [
                  FormBuilderChipOption(
                    value: "Retroreflective Tape",
                  ),
                  FormBuilderChipOption(
                    value: "April Tags",
                  ),
                  FormBuilderChipOption(
                    value: "Both",
                  ),
                  FormBuilderChipOption(
                    value: "Neither",
                  )
                ]),
                CheckboxObj("Can you achieve moibility (driving out of community) during auto?", "AutoMobility"),
                RadioGroupObj("Can you drive onto the charging station during auto?", "AutoStationDrive", const [
                  FormBuilderChipOption(
                    value: "Yes, can dock and engage",
                  ),
                  FormBuilderChipOption(
                    value: "Yes, can dock but not engage",
                  ),
                  FormBuilderChipOption(
                    value: "Both",
                  ),
                  FormBuilderChipOption(
                    value: "Neither",
                  )
                ]),
                TextFieldObj(
                  "What is the maximum amount of game pieces can you score during auto?",
                  "AutoPiecesScored",
                  PIT_FIELDS["AutoPiecesScored"]!,
                ),
                CheckboxObj("Can you intake cubes from the ground?", "CubeGround"),
                CheckboxObj("Can you intake cubes from the shelf?", "CubeShelf"),
                CheckboxObj("Can you intake cubes from the portal?", "CubePortal"),
                CheckboxObj("Can you intake upright cones from the ground?", "ConeGround"),
                CheckboxObj("Can you intake upright cones from the shelf?", "ConeShelf"),
                CheckboxObj("Can you intake upright cones from the portal?", "ConePortal"),
                CheckboxObj("Can you intake not upright cones from the ground?", "SideConeGround"),
                CheckboxObj("Can you intake not upright cones from the shelf?", "SideConeShelf"),
                CheckboxObj("Can you intake not upright cones from the portal?", "SideConePortal"),
                CheckboxGroupObj(
                    "What levels can you score cubes at?", "TeleCubeScoreLevel", const [
                  FormBuilderChipOption(
                    value: "Low",
                  ),
                  FormBuilderChipOption(
                    value: "Mid",
                  ),
                  FormBuilderChipOption(
                    value: "High",
                  ),
                ]),
                CheckboxGroupObj(
                    "What levels can you score cones at?", "TeleConeScoreLevel", const [
                  FormBuilderChipOption(
                    value: "Low",
                  ),
                  FormBuilderChipOption(
                    value: "Mid",
                  ),
                  FormBuilderChipOption(
                    value: "High",
                  ),
                ]),
                RadioGroupObj("Can you drive onto the charging station during endgame?", "EndStationDrive", const [
                  FormBuilderChipOption(
                    value: "Yes, can dock and engage",
                  ),
                  FormBuilderChipOption(
                    value: "Yes, can dock but not engage",
                  ),
                  FormBuilderChipOption(
                    value: "No, can't dock or engage",
                  ),
                ]),
                TextFieldObj(
                  "Any other notable features?",
                  "NotableFeat",
                  PIT_FIELDS["NotableFeat"]!,
                ),
                const Text("Remember to Take a Picture!"),
                Row(
                  children: [
                    Expanded(
                        flex: 100,
                        child: ElevatedButton.icon(
                            onPressed: () {
                              _key.currentState!.save();
                              pitCache = Map<String, dynamic>.from(
                                  _key.currentState!.value);
                              Navigator.of(context).pushReplacement(
                                  MaterialPageRoute(
                                      builder: (ctx) => TakePicturePage(
                                          camera: firstCamera)));
                            },
                            icon: const Icon(Icons.camera_alt),
                            label: const Text("Take picture"))),
                    const Spacer(flex: 20),
                    Expanded(
                        flex: 100,
                        child: ElevatedButton.icon(
                            onPressed: () {
                              pic = null;
                              loadImage().then((value) {
                                setState(() {
                                  img = value;
                                });
                              });
                            },
                            icon: const Icon(Icons.delete_rounded),
                            label: const Text("Delete picture"))),
                    const Spacer(flex: 20),
                    Expanded(
                        flex: 100,
                        child: ElevatedButton.icon(
                            onPressed: () async {
                              pic = await _picker.pickImage(
                                  source: ImageSource.gallery);
                              loadImage().then((value) {
                                setState(() {
                                  img = value;
                                });
                              });
                            },
                            icon: const Icon(Icons.camera),
                            label: const Text("Choose picture"))),
                  ],
                ),
                img,
                ElevatedButton(
                    onPressed: () async {
                      if (_key.currentState!.saveAndValidate()) {
                        addEntry(Map.from(_key.currentState!.value), false);
                        showSnackBar(context, "Added QR Code!",
                            action: SnackBarAction(
                                label: "Go to QR Codes",
                                textColor: Color.fromRGBO(196, 225, 255, 0.8),
                                onPressed: () => Navigator.of(context)
                                    .pushReplacement(MaterialPageRoute(
                                        builder: (ctx) => QRPage()))));
                        if (pic != null) {
                          savePitImage(
                                  int.parse(_key.currentState!.value['TEAM']))
                              .whenComplete(() {
                            pic = null;
                            loadImage().then((value) {
                              setState(() {
                                img = value;
                              });
                            });
                          });
                          _key.currentState!.reset();
                        }
                      } else {
                        showSnackBar(context, "Missing fields");
                      }
                    },
                    child: const Text("Submit"))
              ],
            ))));
  }
}
