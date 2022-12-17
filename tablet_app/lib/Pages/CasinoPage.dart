import 'package:flutter/material.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:mobile_sct_app/FormObjects/SliderObj.dart';
import 'package:mobile_sct_app/NavigationDrawer.dart';
import 'package:mobile_sct_app/UIFunctions.dart';
import 'package:qr_flutter/qr_flutter.dart';

import '../CustomIcons.dart';
import '../FieldInfo.dart';
import '../FormObjects/RadioGroup.dart';
import '../FormObjects/TextFieldObj.dart';
import '../Globals.dart';
import '../LocalDataHandler.dart';

class CasinoPage extends StatefulWidget {
  @override
  State<CasinoPage> createState() => _CasinoPage();
}

class _CasinoPage extends State<CasinoPage> with TickerProviderStateMixin {
  final GlobalKey<FormBuilderState> _key = GlobalKey<FormBuilderState>();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: const Text("CASINO"),
          backgroundColor: Colors.black,
          foregroundColor: const Color.fromARGB(255, 255, 201, 14),
        ),
        body: FormBuilder(
            key: _key,
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  RadioGroupObj(
                    "Who will win",
                    "BET_COLOR",
                    [
                      FormBuilderChipOption(
                        value: "Blue",
                        avatar: Icon(CustomIcons.robot,
                            color: BLUE_TEAM, size: 15.0),
                      ),
                      FormBuilderChipOption(
                        value: "Red",
                        avatar: Icon(CustomIcons.robot,
                            color: RED_TEAM, size: 15.0),
                      ),
                    ],
                  ),
                  SliderObj(
                    "Bet",
                    'BET_AMOUNT',
                    0,
                    50,
                    discreteDivisions: 50,
                  ),
                  RadioGroupObj(
                    "Will your team score Over/Under 50 points",
                    "OVER_UNDER",
                    const [
                      FormBuilderChipOption(
                        value: "Over",
                        avatar: Icon(Icons.arrow_upward,
                            color: Colors.amber, size: 15.0),
                      ),
                      FormBuilderChipOption(
                        value: "Under",
                        avatar: Icon(Icons.arrow_downward,
                            color: Colors.amber, size: 15.0),
                      ),
                    ],
                  ),
                  ElevatedButton(
                      onPressed: () {
                        if (_key.currentState!.saveAndValidate()) {
                          if (casinoCache.isEmpty) {
                            casinoCache = _key.currentState!.value;
                            showSnackBar(context, "Submitted!");
                          } else {
                            showSnackBar(
                                context, "You have already submitted cheater!");
                          }
                        }

                        print(casinoCache);
                      },
                      child: const Text("Submit"))
                ],
              ),
            )));
  }
}
