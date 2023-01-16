import 'package:mobile_sct_app/Globals.dart';

import 'LocalDataHandler.dart';

void addEntry(Map<String, dynamic> arr, bool isMatchQR) {
  if (isMatchQR) {
    arr["TEAM_COLOR"] = tabletColor;
    if (casinoCache.isEmpty) {
      casinoCache['BET_AMOUNT'] = 0;
      casinoCache['BET_COLOR'] = 'null';
      casinoCache['OVER_UNDER'] = 'null';
    }
    arr.addAll(casinoCache);
    casinoCache = {};
  }

  for (String key in arr.keys) {
    if (arr[key] is bool) {
      arr[key] = arr[key] ? '1' : '0';
    } else if (arr[key] is List<dynamic>) {
      arr[key] = arr[key].join(',');
    }
  }
  int idx = 1;
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 9; j++) {
      arr["Auto"+(idx++).toString()]=["empty", "triangle", "cube"].indexOf(TABLE_AUTO[i][j]);
    }
  }
  idx = 1;
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 9; j++) {
      arr["Tele"+(idx++).toString()]=["empty", "triangle", "cube"].indexOf(TABLE_TELEOP[i][j]);
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
