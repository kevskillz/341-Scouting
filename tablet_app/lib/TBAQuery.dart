import 'package:flutter/cupertino.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;

import 'package:mobile_sct_app/Globals.dart';

void clearData() {
  json = [];
}

Future<void> updateJson(String tbaKey) async {
  var url = Uri.parse(
      'https://www.thebluealliance.com/api/v3/event/$tbaKey/matches/simple');
  var response = await http.get(url, headers: {
    'X-TBA-Auth-Key': dotenv.env["TBA_API_KEY"]!,
    'accept': 'application/json'
  }).timeout(const Duration(seconds: 5),
      onTimeout: () => http.Response('Error', 408));
  if (response.statusCode == 408) {
    throw ErrorDescription("No data available");
  }
  var jsonResponse = convert.jsonDecode(response.body) as List<dynamic>;
  jsonResponse.removeWhere((element) => element["comp_level"] != "qm");
  json = List.from(jsonResponse);
}

/// [comp] is competition id per TBA
///
/// [color] is R for Red or B for Blue
///
/// [scoutingNumber] is 1, 2, or 3
///
/// [matchNumber] is match number
Future<int?> getTeam(String color, int scoutingNumber, int matchNumber) async {
  if (json.isEmpty) throw ErrorDescription("Empty data");
  return _queryTeam(color, scoutingNumber, matchNumber);
}

int? _queryTeam(String color, int scoutingNumber, int matchNumber) {
  var value = json.firstWhere(
    (element) {
      return element['match_number'] == matchNumber;
    },
  );
  color = color == 'B' ? 'blue' : 'red';
  String res = value['alliances'][color]['team_keys'][scoutingNumber - 1]
      .toString()
      .replaceFirst('frc', '');
  return int.tryParse(res);
}
