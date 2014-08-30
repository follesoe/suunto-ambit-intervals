/*
	Initialize Variables
*/
if (SUUNTO_DURATION == 0) {
	TARGET = 0;
}

if (SUUNTO_LAP_NUMBER == 1) { prefix = "wu"; postfix = "m"; RESULT = SUUNTO_LAP_DISTANCE*1000; }
else if(SUUNTO_LAP_NUMBER == 2) { prefix = "int"; postfix = "m"; TARGET = 1200; RESULT = TARGET - (SUUNTO_LAP_DISTANCE*1000); }
else if(SUUNTO_LAP_NUMBER == 3) { prefix = "rest"; postfix = "m"; TARGET = 400; RESULT = TARGET - (SUUNTO_LAP_DISTANCE*1000); }
else { preix = "wd"; postfix = "m"; RESULT = SUUNTO_LAP_DISTANCE*1000; }

if (RESULT < 0) {
	RESULT = 0;
	Suunto.alarmBeep();
}

postfix = "m";

/* Warm up */
if (SUUNTO_LAP_NUMBER == 1) {
	prefix = "wu";
	RESULT = SUUNTO_DISTANCE*1000;
}
/* Interval (7 intervals + 7 recovery intervals) */
else if (SUUNTO_LAP_NUMBER > 1 && SUUNTO_LAP_NUMBER <= 15) {
	if (SUUNTO_LAP_NUMBER == 2)  { TARGET = 1200; }
	if (SUUNTO_LAP_NUMBER == 3)  { TARGET = 400; }
	if (SUUNTO_LAP_NUMBER == 4)  { TARGET = 800; }
	if (SUUNTO_LAP_NUMBER == 5)  { TARGET = 400; }
	if (SUUNTO_LAP_NUMBER == 6)  { TARGET = 800; }
	if (SUUNTO_LAP_NUMBER == 7)  { TARGET = 400; }
	if (SUUNTO_LAP_NUMBER == 8)  { TARGET = 200; }
	if (SUUNTO_LAP_NUMBER == 9)  { TARGET = 200; }
	if (SUUNTO_LAP_NUMBER == 10)  { TARGET = 200; }
	if (SUUNTO_LAP_NUMBER == 11) { TARGET = 200; }
	if (SUUNTO_LAP_NUMBER == 12) { TARGET = 200; }
	if (SUUNTO_LAP_NUMBER == 13) { TARGET = 200; }
	if (SUUNTO_LAP_NUMBER == 14) { TARGET = 200; }
	if (SUUNTO_LAP_NUMBER == 15) { TARGET = 200; }

	if (Suunto.mod(SUUNTO_LAP_NUMBER, 2) == 0) {
		prefix = "int";
	} else {
		prefix = "rest";
	}

	RESULT = TARGET - (SUUNTO_LAP_DISTANCE*1000);

	if (RESULT < 0) {
		RESULT = 0;
		Suunto.alarmBeep();
	}
}
/* Cool down */
else {
	prefix = "cd";
	RESULT = SUUNTO_LAP_DISTANCE;
}
