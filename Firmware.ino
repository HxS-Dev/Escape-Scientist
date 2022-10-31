//*****************************************************************************//
/*
First correct signal: TOKEN 1
0s - 1 second of power to solenoid 1
12s - 1 second of power to solenoid 2
30s - cut power to electromagnet 1. 1 second of power to solenoid 3. Lights change from white to green

Second correct signal: TOKEN 2
0s - 1 second of power to solenoid 4
12s - 1 second of power to solenoid 5
30s - cut power to electromagnet 2. 1 second of power to solenoid 6. Lights change from green to red.

Third correct signal: TOKEN 3
0s - 1 second of power to solenoid 7
12s - 1 second of power to solenoid 8
30s - cut power to electromagnet 3. 1 second of power to solenoid 9. Lights turn off and UV light turns on.

Fourth correct signal: TOKEN 4
0s - 1 second of power to solenoid 10
12s - 1 second of power to solenoid 11
30s - cut power to electromagnet 4. 1 second of power to solenoid 12. Send power to electromagnet 5. Uv light turns off and original white lights turn on.
*/

//TOKEN 1
#define solenoid_1 23  // Solenoid 1
#define solenoid_2 25  // Solenoid 2
#define electromagnet_1 27  // Electromagnet 1
#define solenoid_3 29  // Solenoid 3
#define light_whiteToGreen 31  // Lights change from white to green on remote - connect to green button on remote
//TOKEN 2
#define solenoid_4 33  // Solenoid 4
#define solenoid_5 35  // Solenoid 5
#define electromagnet_2 37  // Electromagnet 2
#define solenoid_6 39  // Solenoid 6
#define light_greenToRed 41  // Lights change from greeen to red on remote - connect to red button on remote
//TOKEN 3
#define solenoid_7 43  // Solenoid 7
#define solenoid_8 45  // Solenoid 8
#define electromagnet_3 47  // Electromagnet 3
#define solenoid_9 49  // Solenoid 9
#define light_OFF 51  // Lights goes OFF and UV turns ON - connect to off button on remote
#define UV_ON_OFF 53  //  UV turns ON
//TOKEN 4
#define solenoid_10 38  // Solenoid 10
#define solenoid_11 40  // Solenoid 11
#define electromagnet_4 42  // Electromagnet 4
#define solenoid_12 44  // Solenoid 12
#define electromagnet_5 46  // Electromagnet 5
#define light_white 48  // Lights white goes ON and UV turns OFF - connect to white button on remote 
#define light_ON 50  //  Light ON

String incomingString; // String send by mr X
String TOKEN_1, TOKEN_2, TOKEN_3, TOKEN_4;

int condition = 0;

void setup() {
  // put your setup code here, to run once:
Serial.begin(9600); // opens serial port, sets data rate to 9600 bps 
// Switch all RELAYS OFF
pinMode(solenoid_1, OUTPUT);
pinMode(solenoid_2, OUTPUT);
pinMode(solenoid_3, OUTPUT);
pinMode(solenoid_4, OUTPUT);
pinMode(solenoid_5, OUTPUT);
pinMode(solenoid_6, OUTPUT);
pinMode(solenoid_7, OUTPUT);
pinMode(solenoid_8, OUTPUT);
pinMode(solenoid_9, OUTPUT);
pinMode(solenoid_10, OUTPUT);
pinMode(solenoid_11, OUTPUT);
pinMode(solenoid_12, OUTPUT);
pinMode(electromagnet_1, OUTPUT);
pinMode(electromagnet_2, OUTPUT);
pinMode(electromagnet_3, OUTPUT);
pinMode(electromagnet_4, OUTPUT);
pinMode(electromagnet_5, OUTPUT);
pinMode(light_OFF, OUTPUT);
pinMode(light_ON, OUTPUT);
pinMode(UV_ON_OFF, OUTPUT);
pinMode(light_white, OUTPUT);
pinMode(light_whiteToGreen, OUTPUT);
pinMode(light_greenToRed, OUTPUT);
digitalWrite(solenoid_1, HIGH);
digitalWrite(solenoid_2, HIGH);
digitalWrite(solenoid_3, HIGH);
digitalWrite(solenoid_4, HIGH);
digitalWrite(solenoid_5, HIGH);
digitalWrite(solenoid_6, HIGH);
digitalWrite(solenoid_7, HIGH);
digitalWrite(solenoid_8, HIGH);
digitalWrite(solenoid_9, HIGH);
digitalWrite(solenoid_10, HIGH);
digitalWrite(solenoid_11, HIGH);
digitalWrite(solenoid_12, HIGH);
digitalWrite(electromagnet_1, HIGH);
digitalWrite(electromagnet_2, HIGH);
digitalWrite(electromagnet_3, HIGH);
digitalWrite(electromagnet_4, HIGH);
digitalWrite(electromagnet_5, HIGH);
digitalWrite(light_OFF, HIGH);
digitalWrite(light_ON, HIGH);
digitalWrite(light_white, HIGH);
digitalWrite(light_whiteToGreen, HIGH);
digitalWrite(light_greenToRed, HIGH);
digitalWrite(UV_ON_OFF, HIGH);


TOKEN_1 = String("TOKEN_ONE");   // Hard coded Tokens which will be sent out by mr X. Write it down what they are, for example I did 4 to 7 letters
TOKEN_2 = String("TOKEN_TWO");
TOKEN_3 = String("TOKEN_THREE");
TOKEN_4 = String("TOKEN_FOUR");

}

void loop() {
  // put your main code here, to run repeatedly:

 while(Serial.available()) {
incomingString = Serial.readString();// read the incoming data as string
Serial.println(incomingString); 

if (incomingString == TOKEN_1) {
  condition = 2;
}
else if (incomingString == TOKEN_2) {
  condition = 4;
}
else if (incomingString == TOKEN_3) {
  condition = 6;
}
else if (incomingString == TOKEN_4) {
  condition = 8;
}
 }
 
switch (condition) {

  case 0:
  Serial.println("DEFAULT");
  digitalWrite(light_ON, LOW);
  delay(500);
  digitalWrite(light_ON, HIGH);
  delay(250);
  digitalWrite(light_white, LOW); // Press button on remote WHITE light to switch them ON
  delay(500);
  digitalWrite(light_white, HIGH); // release the button
  condition = 1;
  break;

  case 1:
  Serial.print("WAIT for next TOKEN ");
  break;

  

  case 2:
  digitalWrite(solenoid_1, LOW);
  delay(1000);
  digitalWrite(solenoid_1, HIGH);
  delay(11000);
  digitalWrite(solenoid_2, LOW);
  delay(1000);
  digitalWrite(solenoid_2, HIGH);
  delay(17000);
  digitalWrite(electromagnet_1, LOW);
  digitalWrite(solenoid_3, LOW);
  delay(1000);
  digitalWrite(solenoid_3, HIGH);
  digitalWrite(light_whiteToGreen, LOW);
  delay(500);
  digitalWrite(light_whiteToGreen, HIGH);
  condition = 3;
  break;

  case 3: // PAUSE
  Serial.print("WAIT for next TOKEN ");
  break;

  case 4:
  digitalWrite(solenoid_4, LOW);
  delay(1000);
  digitalWrite(solenoid_4, HIGH);
  delay(11000);
  digitalWrite(solenoid_5, LOW);
  delay(1000);
  digitalWrite(solenoid_5, HIGH);
  delay(17000);
  digitalWrite(electromagnet_2, LOW);
  digitalWrite(solenoid_6, LOW);
  delay(1000);
  digitalWrite(solenoid_6, HIGH);
  digitalWrite(light_greenToRed, LOW);
  delay(500);
  digitalWrite(light_greenToRed, HIGH);
  condition = 5;
  break;

  case 5: // PAUSE
  Serial.print("WAIT for next TOKEN ");
  break;

  case 6:
  digitalWrite(solenoid_7, LOW);
  delay(1000);
  digitalWrite(solenoid_7, HIGH);
  delay(11000);
  digitalWrite(solenoid_8, LOW);
  delay(1000);
  digitalWrite(solenoid_8, HIGH);
  delay(17000);
  digitalWrite(electromagnet_3, LOW);
  digitalWrite(solenoid_9, LOW);
  delay(1000);
  digitalWrite(solenoid_9, HIGH);
  digitalWrite(light_OFF, LOW);
  delay(500);
  digitalWrite(light_OFF, HIGH);
  delay(250);
  digitalWrite(UV_ON_OFF, LOW); // UV ON
  delay(500);
  digitalWrite(UV_ON_OFF, HIGH); // UV OFF
  condition = 7;
  break;

  case 7: // PAUSE
  Serial.print("WAIT for next TOKEN ");
  break;

  case 8:
  digitalWrite(solenoid_10, LOW);
  delay(1000);
  digitalWrite(solenoid_10, HIGH);
  delay(11000);
  digitalWrite(solenoid_11, LOW);
  delay(1000);
  digitalWrite(solenoid_11, HIGH);
  delay(17000);
  digitalWrite(electromagnet_4, LOW);
  digitalWrite(solenoid_12, LOW);
  delay(1000);
  digitalWrite(solenoid_12, HIGH);
  digitalWrite(electromagnet_5, LOW);
  digitalWrite(UV_ON_OFF, LOW); // UV ON
  delay(500);
  digitalWrite(UV_ON_OFF, HIGH); // UV OFF
  digitalWrite(light_ON, LOW);
  delay(500);
  digitalWrite(light_ON, HIGH);
  delay(250);  
  digitalWrite(light_white, LOW); // Press button on remote WHITE light to switch them ON  
  delay(500);
  digitalWrite(light_white, HIGH);   
  condition = 9;
  break;

  case 9: // PAUSE
  Serial.print("WAIT for RESET ");
 // condition = 0;  // back to DEFAULT
  break;
}


delay(100);
}
