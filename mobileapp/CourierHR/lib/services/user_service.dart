import 'dart:convert';
import 'package:http/http.dart' as http;
class UserService {

  final String apiUrl = 'http://10.0.2.2:5000'; // Zmień na rzeczywisty adres API

  Future<Map<String, dynamic>?> getUserInfo(String authToken) async {
    try {
      final response = await http.get(
        Uri.parse('$apiUrl/me'),
        headers: {'Authorization': 'Bearer $authToken'},
      );

      if (response.statusCode == 200) {
        final userData = jsonDecode(response.body);
        return userData;
      } else {
        return null;
      }
    } catch (e) {
      print('Wystąpił błąd: $e');
      return null;
    }
  }
}