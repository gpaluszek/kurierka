import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  final String apiUrl = 'http://10.0.2.2:5000'; // Zmień na rzeczywisty adres API

  Future<Map<String, dynamic>?> login(String email, String password) async {
    try {
      final response = await http.post(
        Uri.parse('$apiUrl/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      final Map<String, dynamic> data = jsonDecode(response.body);
      print('Odpowiedź po zalogowaniu: $data'); // Wypisuje odpowiedź na konsoli

      if (response.statusCode == 200) {
        return data; // To jest token dostępu zwracany przez serwer
      } else if (response.statusCode == 404) {
        return null;
      } else if (response.statusCode == 400) {
        return null;
      } else {
        throw Exception('Błąd logowania');
      }
    } catch (e) {
      print('Wystąpił błąd: $e');
      return null;
    }
  }





  Future<Map<String, dynamic>?> getUserData(String accessToken) async {
    try {
      final response = await http.get(
        Uri.parse('$apiUrl/Me'),
        headers: {
          'Authorization': 'Bearer $accessToken',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = jsonDecode(response.body);
        return data;
      } else {
        // Obsłuż błędy pobierania danych użytkownika, na przykład rzucając wyjątkiem
        throw Exception('Błąd pobierania danych użytkownika');
      }
    } catch (e) {
      // Obsłuż błąd sieci lub inne wyjątki tutaj
      print('Wystąpił błąd: $e');
      return null;
    }
  }
}
