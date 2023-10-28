import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:intl/intl.dart';
import 'home_page.dart';

class AllCommuniquesScreen extends StatefulWidget {
  AllCommuniquesScreen();

  @override
  _AllCommuniquesScreenState createState() => _AllCommuniquesScreenState();
}

class _AllCommuniquesScreenState extends State<AllCommuniquesScreen> {
  List<Communique> communiques = [];

  @override
  void initState() {
    super.initState();
    _getMessages(); // Pobieranie wszystkich komunikatów
  }

  Future<void> _getMessages() async {
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

        setState(() {
          communiques = fetchedCommuniques;
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
    return Scaffold(
      appBar: AppBar(
        title: Text('Wszystkie Komunikaty'),
      ),
      body: ListView.builder(
        itemCount: communiques.length,
        itemBuilder: (context, index) {
          final communique = communiques[index];
          final formattedDate =
          DateFormat('HH:mm dd.MM.yyyy').format(communique.timestamp);

          return _buildCommuniqueItem(communique, formattedDate);
        },
      ),
    );
  }

  Widget _buildCommuniqueItem(Communique communique, String formattedDate) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
      ),
      margin: EdgeInsets.only(bottom: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Od: ${communique.sender}',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.normal,
              color: Colors.black,
            ),
          ),
          SizedBox(height: 5),
          Text(
            'Data: $formattedDate',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.normal,
              color: Colors.black,
            ),
          ),
          SizedBox(height: 5),
          Text(
            'Treść: ${communique.message}',
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.normal,
              color: Color(0xFF7A7A88),
            ),
          ),
        ],
      ),
    );
  }
}
