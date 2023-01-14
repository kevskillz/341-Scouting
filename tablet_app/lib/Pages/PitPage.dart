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
                  "SCOUT_NAME",
                  PIT_FIELDS["SCOUT_NAME"]!,
                ),
                TextFieldObj(
                  "Team",
                  "TEAM",
                  PIT_FIELDS["TEAM"]!,
                ),
                RadioGroupObj("Drivetrain", "DRIVETRAIN", const [
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
                  "Robot Width",
                  "ROBOT_WIDTH",
                  PIT_FIELDS["ROBOT_WIDTH"]!,
                ),
                TextFieldObj(
                  "Robot Length",
                  "ROBOT_LENGTH",
                  PIT_FIELDS["ROBOT_LENGTH"]!,
                ),
                TextFieldObj(
                  "Station Robot Width",
                  "STATION_ROBOT_WIDTH",
                  PIT_FIELDS["ROBOT_LENGTH"]!,
                ),
                RadioGroupObj("Vision", "VISION", const [
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
                CheckboxObj("Can score in high hub", "CAN_HIGH_HUB"),
                CheckboxObj("Can score in low hub", "CAN_LOW_HUB"),
                CheckboxGroupObj(
                    "Select ALL Climb Levels", "CLIMB_LEVELS", const [
                  FormBuilderChipOption(
                    value: "Low",
                  ),
                  FormBuilderChipOption(
                    value: "Mid",
                  ),
                  FormBuilderChipOption(
                    value: "High",
                  ),
                  FormBuilderChipOption(
                    value: "Traversal",
                  )
                ]),
                RadioGroupObj("Vision Type", "VISION_TYPE", const [
                  FormBuilderChipOption(
                    value: "Limelight",
                  ),
                  FormBuilderChipOption(
                    value: "Custom",
                  ),
                  FormBuilderChipOption(
                    value: "Just a camera",
                  ),
                  FormBuilderChipOption(
                    value: "No vision",
                  )
                ]),
                const Text("Picture of robot"),
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
