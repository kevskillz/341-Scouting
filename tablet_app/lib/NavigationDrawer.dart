import 'package:flutter/material.dart';
import 'package:mobile_sct_app/CustomIcons.dart';

import 'package:mobile_sct_app/Globals.dart';
import 'package:mobile_sct_app/Pages/CasinoPage.dart';

import 'Pages/ConfigPage.dart';
import 'Pages/MatchPage.dart';
import 'Pages/PitPage.dart';
import 'Pages/QRPage.dart';
import 'UIFunctions.dart';

class NavigationDrawer extends StatelessWidget {
  void Function()? onPageTap;
  NavigationDrawer({this.onPageTap});
  @override
  Widget build(BuildContext context) {
    return Drawer(
        backgroundColor: Color.fromARGB(255, 47, 49, 64),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              buildHeader(context),
              const Divider(
                height: 20,
                color: Colors.white,
              ),
              buildMenuItems(context)
            ],
          ),
        ));
  }

  buildHeader(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(top: 5.0),
      child: Column(
        children: [
          CircleAvatar(
            radius: 30.0,
            backgroundColor: tabletColor == 'B' ? BLUE_TEAM : RED_TEAM,
            child: Text(
              tabletNumber.toString(),
              style: const TextStyle(
                  color: Color.fromARGB(255, 47, 49, 64), fontSize: 40.0),
            ),
          ),
          const SizedBox(
            height: 10.0,
          ),
          Text(COMP == '' ? "No comp data loaded" : "$COMP data loaded")
        ],
      ),
    );
  }

  buildMenuItems(BuildContext context) {
    return Wrap(
      runSpacing: 16.0,
      alignment: WrapAlignment.center,
      children: [
        ListTile(
          leading: const Icon(Icons.settings),
          title: const Text("Config"),
          onTap: () {
            onPageTap?.call();

            Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (ctx) => ConfigPage()));
          },
        ),
        ListTile(
          leading: const Icon(CustomIcons.robot),
          title: const Text("Match Scouting"),
          onTap: () {
            onPageTap?.call();

            Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: (ctx) => const MatchPage()));
          },
        ),
        ListTile(
          leading: const Icon(CustomIcons.clipboard_list),
          title: const Text("Pit Scouting"),
          onTap: () {
            onPageTap?.call();
            Navigator.of(context)
                .push(MaterialPageRoute(builder: (ctx) => PitPage()));
          },
        ),
        ListTile(
          leading: const Icon(Icons.qr_code_2_outlined),
          title: const Text("QR Codes"),
          onTap: () {
            onPageTap?.call();

            Navigator.of(context)
                .pushReplacement(MaterialPageRoute(builder: (ctx) => QRPage()));
          },
        ),
        ListTile(
          leading: const Icon(Icons.casino_outlined),
          title: const Text("Backdoor"),
          onTap: () {
            onPageTap?.call();
            if(MatchStarted){
          showSnackBar(context, "It seems the backdoor is locked right now...");
              
            }
            else{
            Navigator.of(context)
                .push(MaterialPageRoute(builder: (ctx) => CasinoPage()));
            }
          },
        ),
      ],
    );
  }
}
