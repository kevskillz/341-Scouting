import 'package:mobile_sct_app/Globals.dart';

import 'LocalDataHandler.dart';

void addEntry(Map<String, dynamic> arr, bool isMatchQR) {
  if (isMatchQR) arr["TEAM_COLOR"] = tabletColor;

  for (String key in arr.keys) {
    if (arr[key] is bool) {
      arr[key] = arr[key] ? '1' : '0';
    } else if (arr[key] is List<dynamic>) {
      arr[key] = arr[key].join(',');
    }
  }

  if (isMatchQR) {
    rawMatchQRData.add(arr);
    saveMatchQRCodes();
  } else {
    rawPitQRData.add(arr);
    savePitQRCodes();
  }
}
