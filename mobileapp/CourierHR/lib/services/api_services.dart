// api_service.dart

import 'package:http/http.dart' as http;

class ApiService {
  final String baseUrl;

  ApiService({required this.baseUrl});

  Future<http.Response> postLogin(Map<String, dynamic> body) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login'),
      body: body,
    );
    return response;
  }
}
