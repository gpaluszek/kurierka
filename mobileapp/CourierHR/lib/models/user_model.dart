class UserModel {
  final int id; // Zmieniamy typ na int, ponieważ id w bazie danych jest typu Int
  final String name;
  final String email;
  final String? surname; // Dodajemy pozostałe pola użytkownika
  final String? street;
  final String? houseNumber;
  final String? city;
  final String? postCode;
  final String? sex;
  final String? phoneNumber;
  final String? password;
  final String? role;
  final bool? status;
  final DateTime? createdAt;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    this.surname,
    this.street,
    this.houseNumber,
    this.city,
    this.postCode,
    this.sex,
    this.phoneNumber,
    this.password,
    this.role,
    this.status,
    this.createdAt,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      name: json['name'] ?? '', // Dodaj kontrolę null
      email: json['email'] ?? '', // Dodaj kontrolę null
      surname: json['surname'] ?? '', // Dodaj kontrolę null
      street: json['street'] ?? '', // Dodaj kontrolę null
      houseNumber: json['houseNumber'] ?? '', // Dodaj kontrolę null
      city: json['city'] ?? '', // Dodaj kontrolę null
      postCode: json['postCode'] ?? '', // Dodaj kontrolę null
      sex: json['sex'] ?? '', // Dodaj kontrolę null
      phoneNumber: json['phoneNumber'] ?? '', // Dodaj kontrolę null
      password: json['password'] ?? '', // Dodaj kontrolę null
      role: json['role'] ?? '', // Dodaj kontrolę null
      status: json['status'] ?? false, // Dodaj kontrolę null
      createdAt: DateTime.parse(json['createdAt'] ?? ''), // Dodaj kontrolę null
    );
  }


}
