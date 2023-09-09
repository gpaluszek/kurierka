import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
class HomePage extends StatelessWidget {
  final String userName = "Grzegorz Paluch"; // Imię i nazwisko użytkownika
  final String userGroup = "Grupa: A.Ciask #0001"; // Grupa użytkownika

  HomePage();

  @override
  Widget build(BuildContext context) {
    Color circleColor = Color(0xFF859AA7); // Kolor tła kółka
    Color Bgcolor = Color(0xFFF3F2F8); // Kolor tła kółka
    Color menuBackgroundColor = Color(0xFF3C3C57); // Kolor tła menu

    return Scaffold(
      backgroundColor: Bgcolor, // Kolor tła strony
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(56.0), // Ustal wysokość AppBar
        child: AppBar(
          backgroundColor: Bgcolor, // Kolor tła menu
          elevation: 1.0, // Ustal wartość elevation na 1, aby dodać cień
          actions: [
            // Dodaj ikonę loga z prawej strony
            Padding(
              padding: const EdgeInsets.only(right: 16.0),
              child: ImageIcon(
                AssetImage('assets/logoappbar.png'), // Dodaj ścieżkę do twojego logo
              ),
            ),
          ],
          title: Row(
            children: [
              // Kółko z literami imienia i nazwiska (z lewej)
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: circleColor, // Kolor tła kółka
                ),
                child: Center(
                  child: Text(
                    '${userName[0].toUpperCase()}${userName.split(' ')[1][0].toUpperCase()}',
                    style: TextStyle(
                      color: Colors.white, // Kolor liter w kółku
                      fontFamily: 'Poppins',
                      fontSize: 14,
                      fontWeight: FontWeight.normal,
                    ),
                  ),
                ),
              ),
              SizedBox(width: 8),
              // Kolumna z napisami (imię i nazwisko nad grupą)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Pełne imię i nazwisko
                  Text(
                    userName,
                    style: TextStyle(
                      fontSize: 12,
                      fontFamily: 'Poppins',
                      fontWeight: FontWeight.normal,
                      color: Colors.black, // Kolor tekstu poza kółkiem
                    ),
                  ),
                  // Grupa użytkownika
                  Text(
                    userGroup,
                    style: TextStyle(
                      fontSize: 12,
                      fontFamily: 'Poppins',
                      fontWeight: FontWeight.normal,
                      color: Colors.black, // Kolor tekstu grupy
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(height: 16),
            // Tutaj dodaj informacje i akcje, np. karty lub przyciski
            Text('Tutaj umieść swoje informacje i akcje'),
            // Przykład przycisku
            ElevatedButton(
              onPressed: () {
                // Dodaj obsługę akcji po naciśnięciu przycisku
              },
              child: Text('Przykładowy przycisk'),
            ),
          ],
        ),
      ),
        bottomNavigationBar: BottomNavigationBar(
          backgroundColor: menuBackgroundColor, // Kolor tła menu dolnego
          items: <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: SvgPicture.asset(
                'assets/icons/homeicon.svg', // Ścieżka do ikony SVG
              ),
              label: '', // Pusta etykieta
            ),
            BottomNavigationBarItem(
              icon: SvgPicture.asset(
                'assets/icons/homeicon.svg', // Ścieżka do kolejnej ikony SVG

              ),
              label: '', // Pusta etykieta
            ),
            // Dodaj więcej elementów do menu dolnego
          ],
        )

    );
  }
}
