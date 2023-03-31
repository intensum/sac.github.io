#include "MicroBit.h"
MicroBit uBit;

#define EVENT_ID    8888
#define GreenOn   76
#define GreenOff  82

#define RedOn   65
#define RedOff  66

#define BlueOn   67
#define BlueOff  68

#define allOff  28

bool runOff = false;

bool LED_RED = false;
bool LED_GREEN = false;
bool LED_BLUE = false;


void onConnected(MicroBitEvent) {
  //uBit.display.print("C");
}

 
void onDisconnected(MicroBitEvent){
  //uBit.display.print("D");
}


void onControllerEvent(MicroBitEvent e) {
  //uBit.display.print(e.value);

  if (e.value == GreenOn)  
    LED_GREEN = true;
 
  if (e.value == GreenOff)   
    LED_GREEN = false;

  if (e.value == RedOn)  
    LED_RED = true;
 
  if (e.value == RedOff)   
    LED_RED = false;

   if (e.value == BlueOn)  
    LED_BLUE = true;
 
  if (e.value == BlueOff)   
    LED_BLUE = false;

  if (e.value == allOff)   
    runOff = true;

}

void showHeart() {
  while (1) {
    if (LED_GREEN) {
      	uBit.io.P1.setAnalogValue(0); 
      	uBit.sleep(100);
    }

    if (!LED_GREEN) {
    	uBit.io.P1.setAnalogValue(1023); 
    	uBit.sleep(100);
    }
    
    if (LED_RED) {
      	uBit.io.P0.setAnalogValue(0); 
      	uBit.sleep(100);
    }

    if (!LED_RED) {
    	uBit.io.P0.setAnalogValue(1023); 
    	uBit.sleep(100);
    }

    if (LED_BLUE) {
      	uBit.io.P2.setAnalogValue(0);  
      	uBit.sleep(100);
    }

    if (!LED_BLUE) {
      	uBit.io.P2.setAnalogValue(1023);  
      	uBit.sleep(100);
    }

    if (runOff) {
      uBit.io.P0.setAnalogValue(1023); 
      uBit.io.P1.setAnalogValue(1023); 
      uBit.io.P2.setAnalogValue(1023); 
      runOff = false;
    }

    uBit.sleep(500);    
  }
}

int main() {
    uBit.init();
    uBit.display.scroll("DC");
    create_fiber(showHeart);

    new MicroBitIOPinService(*uBit.ble, uBit.io);

    uBit.messageBus.listen(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_CONNECTED, onConnected);
    uBit.messageBus.listen(MICROBIT_ID_BLE, MICROBIT_BLE_EVT_DISCONNECTED, onDisconnected);
    uBit.messageBus.listen(EVENT_ID, MICROBIT_EVT_ANY, onControllerEvent);

    
    release_fiber();
}
