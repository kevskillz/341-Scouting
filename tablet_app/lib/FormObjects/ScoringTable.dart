import 'package:flutter/material.dart';

import '../CustomIcons.dart';

class ScoringTable extends StatefulWidget {
  @override
  _ScoringTable createState() => _ScoringTable();
}



class _ScoringTable extends State<ScoringTable> {
  late List<List<String>> _table;
  
  @override
  void initState() {
    super.initState();
    _table = List.generate(3, (_) => List.generate(9, (_) => "empty"));
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
              color: _table[row][col] == "empty"
                    ? Colors.white
                    : _table[row][col] == "triangle"
                        ? Color.fromARGB(255, 192, 195, 25)
                        : Color.fromARGB(255, 208, 0, 255),
              height: 125, child:
            TableRowInkWell(
              onTap: () {
                setState(() {
                  if (row>1) {
                  _table[row][col] = _table[row][col] == "empty" ? "triangle" : _table[row][col] == "triangle" ? "cube" : "empty";

                  }
                  else {
                    if ([0,2,3,5,6,8].contains(col)) {
                      _table[row][col] = _table[row][col] == "empty" ? "triangle" : "empty";
                    }
                    else {
                      _table[row][col] = _table[row][col] == "empty" ? "cube" : "empty";

                    }
                  }
                });
              },
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [_table[row][col] == "empty"
                    ? const Icon(CustomIcons.robot, color: Colors.white,)
                    : _table[row][col] == "triangle"
                        ? const Icon(CustomIcons.traffic_cone, size: 100)
                        : const Icon(CustomIcons.cube, size: 100,),]
              ),
           )
            );
          }),
        );
      }),
    ));
  }
}

