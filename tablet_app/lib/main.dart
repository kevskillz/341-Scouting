import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'Pages/ConfigPage.dart';

Future main() async {
  await dotenv.load(fileName: '.env');
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // final Future<Directory?>? _tempDirectory;
  // void _requestTempDirectory() {
  //     _tempDirectory = getTemporaryDirectory();
  // }

  static const String _title = 'Scouting App';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: _title,
        theme: ThemeData.dark().copyWith(
            elevatedButtonTheme: ElevatedButtonThemeData(
          style: TextButton.styleFrom(
              shape: const RoundedRectangleBorder(
                  borderRadius: BorderRadius.all(Radius.circular(20.0))),
              backgroundColor: Colors.black87,
              foregroundColor: Colors.white),
        )),
        home: ConfigPage(
          initApp: true,
        ));
  }
}
