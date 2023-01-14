import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_form_builder/flutter_form_builder.dart';
import 'package:mobile_sct_app/CustomIcons.dart';
import 'package:mobile_sct_app/UIFunctions.dart';
import 'package:mobile_sct_app/FormObjects/RadioGroup.dart';
import 'package:mobile_sct_app/Globals.dart';
import 'package:mobile_sct_app/NavigationDrawer.dart';
import 'package:mobile_sct_app/TBAQuery.dart';

import '../FieldInfo.dart';
import '../LocalDataHandler.dart';
import '../FormObjects/TextFieldObj.dart';

class ConfigPage extends StatefulWidget {
  bool initApp;

  ConfigPage({super.key, this.initApp = false});

  @override
  State<StatefulWidget> createState() => _ConfigPage();
}

class _ConfigPage extends State<ConfigPage> {
  final GlobalKey<FormBuilderState> _key = GlobalKey<FormBuilderState>();
  TextEditingController eventController = TextEditingController(text: COMP);

  @override
  void initState() {
    if (widget.initApp) {
      fetchLocalConfig().then(
        (value) {
          setState(() {
            _key.currentState!.patchValue(
                {'_TAB_COLOR': tabletColor, '_NUMBER': tabletNumber});
            _key.currentState!.save();
          });
        },
      );
      fetchLocalTBAData().then((value) {
        setState(() {
          eventController.text = COMP;
          if (COMP != '') {
            showSnackBar(context, "Loaded cached TBA Data");
          }
        });
      });
      fetchMatchQRCodes().then((value) {
        setState(() {
          showSnackBar(context, "Loaded cached match QR Data");
        });
      });
      fetchPitQRCodes().then((value) {
        setState(() {
          showSnackBar(context, "Loaded cached pit QR Data");
        });
      });
      widget.initApp = false;
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(centerTitle: true, title: const Text("Config")),
        drawer: NavigationDrawer(),
        body: FormBuilder(
            key: _key,
            child: SingleChildScrollView(
                child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                RadioGroupObj(
                  "Tablet Color",
                  "_TAB_COLOR",
                  [
                    FormBuilderChipOption(
                      value: "B",
                      avatar:
                          Icon(CustomIcons.robot, color: BLUE_TEAM, size: 15.0),
                    ),
                    FormBuilderChipOption(
                      value: "R",
                      avatar: Icon(
                        CustomIcons.robot,
                        color: RED_TEAM,
                        size: 15.0,
                      ),
                    ),
                  ],
                  onChanged: (p0) => tabletColor = p0,
                  initialValue: tabletColor,
                ),
                RadioGroupObj(
                  "Tablet Number",
                  "_NUMBER",
                  const [
                    FormBuilderChipOption(
                      value: 1,
                    ),
                    FormBuilderChipOption(value: 2),
                    FormBuilderChipOption(value: 3)
                  ],
                  onChanged: (p0) => tabletNumber = p0,
                  initialValue: tabletNumber,
                ),
                ElevatedButton.icon(
                    onPressed: () async {
                      saveLocalConfig();
                      showSnackBar(context, "Successfully saved config");
                    },
                    icon: const Icon(Icons.download_rounded),
                    label: const Text("Save Config")),
                TextFieldObj(
                  "TBA Competition Id",
                  "COMP_ID",
                  FieldInfo(
                    formatter: FilteringTextInputFormatter.deny(''),
                    inputType: TextInputType.text,
                  ),
                  controller: eventController,
                ),
                ElevatedButton.icon(
                    onPressed: () async {
                      updateJson(eventController.text).then((val) {
                        saveLocalTBAData();
                        showSnackBar(context, "Successfully loaded data");
                        _key.currentState!.save();
                        COMP = eventController.text;
                      }, onError: (err) {
                        showSnackBar(context, "Could not load data");
                      });
                    },
                    icon: const Icon(Icons.refresh_rounded),
                    label: const Text("Reload TBA Data")),
                ElevatedButton.icon(
                    onPressed: () {
                      clearData();
                      saveLocalTBAData();
                      showSnackBar(context, "Successfully cleared TBA Data");
                      COMP = '';
                    },
                    icon: const Icon(Icons.delete_rounded),
                    label: const Text("Delete TBA Data")),
              ],
            ))));
  }
}
