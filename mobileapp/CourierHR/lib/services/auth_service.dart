
import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  final String apiUrl = 'http://10.0.2.2:5000'; // Zmień na rzeczywisty adres API

  Future<bool> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$apiUrl/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        return true; // Zwracaj true, jeśli zalogowano poprawnie
      } else {
        return false;
      }
    } catch (e) {
      print('Wystąpił błąd: $e');
      return false;
    }
  }





  Future<Map<String, dynamic>?> getUserData(String email) async {
    try {
      final response = await http.get(
        Uri.parse('$apiUrl/Me?email=$email'), // Przekazuj email jako parametr
        headers: {
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = jsonDecode(response.body);
        return data;
      } else {
        print('Kod odpowiedzi HTTP: ${response.statusCode}');
        print('Treść odpowiedzi: ${response.body}');
        return null; // Zamiast rzucenia wyjątku
      }
    } catch (e) {
      // Obsłuż błąd sieci lub inne wyjątki tutaj
      print('Wystąpił błąd: $e');
      return null;
    }
  }

}
