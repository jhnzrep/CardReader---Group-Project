import requests
import RPi.GPIO as GPIO
import evdev
from time import sleep

GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.OUT)

device = evdev.InputDevice('/dev/input/event3')
print(device)
rawKeyCardCode = []

def authenticate(id):
  r = requests.post('https://jsmbcardreader.azurewebsites.net/api/entry/'+ id)
  return r.status_code == 200



def SetAngle(angle):
  pwm =  GPIO.PWM(11, 50)
  pwm.start(0)
  duty = angle / 18 + 2
  GPIO.output(11, True)
  pwm.ChangeDutyCycle(duty)
  sleep(1)
  GPIO.output(11, False)
  pwm.ChangeDutyCycle(0)
  pwm.stop()


for event in device.read_loop():
    if event.type == evdev.ecodes.EV_KEY and event.value == 00:
        key = evdev.ecodes.KEY[event.code]
        if key != "KEY_ENTER":
            ch = key.split("_")[1]
            rawKeyCardCode.append(ch)
        else:
          keyCardCode = "".join(rawKeyCardCode)
          rawKeyCardCode = []

          print("Code: " + keyCardCode)
          isAuthorized = authenticate(keyCardCode)

          if isAuthorized:
            SetAngle(30)
            print("Open the Door")
            sleep(1)
            SetAngle(0)
          else:
            print("Don't open the doors")

GPIO.cleanup()
