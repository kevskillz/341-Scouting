import 'package:flutter/material.dart';

import '../CustomIcons.dart';
import '../Globals.dart';

class ScoringTable extends StatefulWidget {
  late bool isAuto;

  ScoringTable({required this.isAuto});

  @override
  _ScoringTable createState() => _ScoringTable();
}

class _ScoringTable extends State<ScoringTable> {
  @override
  void initState() {
    super.initState();
  }

  Color getColor(int row, int col) {
    if (widget.isAuto) {
      if (TABLE_TELEOP[row][col] != "empty") {
        return Colors.black;
      } else {
        return TABLE_AUTO[row][col] == "empty"
            ? Colors.white
            : TABLE_AUTO[row][col] == "triangle"
                ? Color.fromARGB(255, 192, 195, 25)
                : Color.fromARGB(255, 208, 0, 255);
      }
    } else {
      if (TABLE_AUTO[row][col] != "empty") {
        return Colors.black;
      } else {
        return TABLE_TELEOP[row][col] == "empty"
            ? Colors.white
            : TABLE_TELEOP[row][col] == "triangle"
                ? Color.fromARGB(255, 192, 195, 25)
                : Color.fromARGB(255, 208, 0, 255);
      }
    }
  }

  Icon getIcon(int row, int col) {
    if (TABLE_AUTO[row][col] != "empty") {
      return TABLE_AUTO[row][col] == "triangle"
          ? const Icon(CustomIcons.traffic_cone, size: 100)
          : const Icon(CustomIcons.cube, size: 100);
    } else if (TABLE_TELEOP[row][col] != "empty") {
      return TABLE_TELEOP[row][col] == "triangle"
          ? const Icon(CustomIcons.traffic_cone, size: 100)
          : const Icon(CustomIcons.cube, size: 100);
    }
    if ([0, 2, 3, 5, 6, 8].contains(col)) {
      if (row != 2) {
        return const Icon(CustomIcons.traffic_cone,
            color: Colors.grey, size: 100);
      }
      else{
      return const Icon(
        CustomIcons.robot,
        color: Colors.white,
      );
      }
    } else if ([1, 4, 7].contains(col)) {
      if (row != 2) {
        return const Icon(CustomIcons.cube, color: Colors.grey, size: 100);
      }
      else{
      return const Icon(
        CustomIcons.robot,
        color: Colors.white,
      );
      }
    } else {
      return const Icon(
        CustomIcons.robot,
        color: Colors.white,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
        child: Table(
      border: TableBorder.all(),
      children: List.generate(3, (row) {
        return TableRow(
          children: List.generate(9, (col) {
            return Container(
                color: getColor(row, col),
                height: 125,
                child: TableRowInkWell(
                  onTap: () {
                    setState(() {
                      if (widget.isAuto && TABLE_TELEOP[row][col] != "empty") {
                        return;
                      }
                      if (!widget.isAuto && TABLE_AUTO[row][col] != "empty") {
                        return;
                      }
                      if (widget.isAuto) {
                        if (row > 1) {
                          TABLE_AUTO[row][col] = TABLE_AUTO[row][col] == "empty"
                              ? "triangle"
                              : TABLE_AUTO[row][col] == "triangle"
                                  ? "cube"
                                  : "empty";
                        } else {
                          if ([0, 2, 3, 5, 6, 8].contains(col)) {
                            TABLE_AUTO[row][col] =
                                TABLE_AUTO[row][col] == "empty"
                                    ? "triangle"
                                    : "empty";
                          } else {
                            TABLE_AUTO[row][col] =
                                TABLE_AUTO[row][col] == "empty"
                                    ? "cube"
                                    : "empty";
                          }
                        }
                      } else {
                        if (row > 1) {
                          TABLE_TELEOP[row][col] =
                              TABLE_TELEOP[row][col] == "empty"
                                  ? "triangle"
                                  : TABLE_TELEOP[row][col] == "triangle"
                                      ? "cube"
                                      : "empty";
                        } else {
                          if ([0, 2, 3, 5, 6, 8].contains(col)) {
                            TABLE_TELEOP[row][col] =
                                TABLE_TELEOP[row][col] == "empty"
                                    ? "triangle"
                                    : "empty";
                          } else {
                            TABLE_TELEOP[row][col] =
                                TABLE_TELEOP[row][col] == "empty"
                                    ? "cube"
                                    : "empty";
                          }
                        }
                      }
                    });
                  },
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        getIcon(row, col),
                      ]),
                ));
          }),
        );
      }),
    ));
  }
}
