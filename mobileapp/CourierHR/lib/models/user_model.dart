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
      name: json['name'],
      email: json['email'],
      surname: json['surname'],
      street: json['street'],
      houseNumber: json['houseNumber'],
      city: json['city'],
      postCode: json['postCode'],
      sex: json['sex'],
      phoneNumber: json['phoneNumber'],
      password: json['password'],
      role: json['role'],
      status: json['status'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }
}
