import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:intl/intl.dart';
import 'communiques_lists.dart';

class Communique {
  final String message;
  final String sender;
  final DateTime timestamp;

  Communique({
    required this.message,
    required this.sender,
    required this.timestamp,
  });
}

class HomePage extends StatefulWidget {
  final String email;

  HomePage({required this.email});

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String userName = "";
  String userGroup = "";
  String userLastName = "";
  List<Communique> communiques = [];

  @override
  void initState() {
    super.initState();
    getUserInfo();
    getMessages();
  }

  void getUserInfo() async {
    userGroup = "Grupa: A.Ciask #1234";
    try {
      final response = await http.get(
        Uri.parse('http://10.0.2.2:5000/users/1'),
      );

      if (response.statusCode == 200) {
        final userData = json.decode(response.body);
        final firstName = userData['name'] ?? '';
        final lastName = userData['surname'] ?? '';

        setState(() {
          userName = "$firstName $lastName";
          userLastName = lastName;
        });
      } else {
        print("Błąd podczas pobierania danych użytkownika");
      }
    } catch (e) {
      print("Błąd połączenia: $e");
    }
  }

  void getMessages() async {
    try {
      final response = await http.get(
        Uri.parse('http://10.0.2.2:5000/communiques'),
      );

      if (response.statusCode == 200) {
        final List<dynamic> data = json.decode(response.body);
        final List<Communique> fetchedCommuniques = data.map((item) {
          return Communique(
            message: item['message'].toString(),
            sender: item['sender'].toString(),
            timestamp: DateTime.parse(item['timestamp']),
          );
        }).toList();


        fetchedCommuniques.sort((a, b) => b.timestamp.compareTo(a.timestamp));


        final latestCommuniques =
        fetchedCommuniques.take(2).toList();

        setState(() {
          communiques = latestCommuniques;
        });
      } else {
        print("Błąd podczas pobierania komunikatów");
      }
    } catch (e) {
      print("Błąd połączenia: $e");
    }
  }


  @override
  Widget build(BuildContext context) {
    Color circleColor = Color(0xFF859AA7);
    Color Bgcolor = Color(0xFFF3F2F8);
    Color menuBackgroundColor = Color(0xFF3C3C57);
    Color textColor = Color(0xFF7A7A88);
    double padding = 5;

    return Scaffold(
      backgroundColor: Bgcolor,
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(56.0),
        child: AppBar(
          backgroundColor: Bgcolor,
          elevation: 1.0,
          actions: [
            Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: SvgPicture.asset(
                'assets/icons/logoicon.svg',
                height: 24.0,
              ),
            ),
          ],
          title: Row(
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: circleColor,
                ),
                child: Center(
                  child: Text(
                    '${userName.isNotEmpty ? userName[0].toUpperCase() : ""}${userLastName.isNotEmpty ? userLastName[0].toUpperCase() : ""}',
                    style: TextStyle(
                      color: Colors.white,
                      fontFamily: 'Poppins',
                      fontSize: 14,
                      fontWeight: FontWeight.normal,
                    ),
                  ),
                ),
              ),
              SizedBox(width: 8),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    userName,
                    style: TextStyle(
                      fontSize: 12,
                      fontFamily: 'Poppins',
                      fontWeight: FontWeight.normal,
                      color: Colors.black,
                    ),
                  ),
                  Text(
                    userGroup,
                    style: TextStyle(
                      fontSize: 12,
                      fontFamily: 'Poppins',
                      fontWeight: FontWeight.normal,
                      color: Colors.black,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Container(
            width: double.infinity,
            padding: EdgeInsets.only(top: 0, left: 16, right: 16, bottom: 0),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        SvgPicture.asset(
                          'assets/icons/notification.svg',
                          height: 20,
                          color: textColor,
                        ),
                        SizedBox(width: 8),
                        Text(
                          'Komunikaty',
                          style: TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.normal,
                            color: textColor,
                          ),
                        ),
                      ],
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => AllCommuniquesScreen(),
                          ),
                        );

                      },
                      child: Text(
                        'Czytaj więcej',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.normal,
                          color: textColor,
                        ),
                      ),
                    ),


                  ],
                ),
                SizedBox(height: 16),
                Column(
                  children: communiques.map((communique) {
                    final formattedDate =
                    DateFormat('HH:mm dd.MM.yyyy').format(communique.timestamp);

                    return Container(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      margin: EdgeInsets.only(bottom: 8),
                      padding: EdgeInsets.only(left: 9, right: 9, top: 9, bottom: 9),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  Container(
                                    width: 24,
                                    height: 24,
                                    decoration: BoxDecoration(
                                      shape: BoxShape.circle,
                                      color: Color(0xFFFFDDDD),
                                    ),
                                    child: Center(
                                      child: SvgPicture.asset(
                                        'assets/icons/warning.svg',
                                        width: 11,
                                      ),
                                    ),
                                  ),
                                  SizedBox(width: 8),
                                  Text(
                                    communique.sender,
                                    style: TextStyle(
                                      fontSize: 12,
                                      fontWeight: FontWeight.normal,
                                      color: Color(0xFF3C3C3D),
                                    ),
                                  ),
                                ],
                              ),
                              Spacer(),
                              Text(
                                formattedDate,
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.normal,
                                  color: Color(0xFF3C3C3D),
                                ),
                              ),
                            ],
                          ),
                          SizedBox(height: 5),
                          Padding(
                            padding: EdgeInsets.only(left: 32),
                            child: Text(
                              communique.message,
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.normal,
                                color: Color(0xFF7A7A88),
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),

              ],
            ),
          ),
        ],
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: menuBackgroundColor,
        items: <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: SvgPicture.asset(
              'assets/icons/homeicon.svg',
            ),
            label: '',
          ),
          BottomNavigationBarItem(
            icon: SvgPicture.asset(
              'assets/icons/homeicon.svg',
            ),
            label: '',
          ),
        ],
      ),
    );
  }
}
