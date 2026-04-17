import { Question } from "../types/quiz";

export const defaultQuestions: Question[] = [
  {
    id: 1,
    text: "What is the core microcontroller chip utilized on the Arduino UNO board?",
    options: ["ATmega2560", "ESP32", "ATmega328P", "ARM Cortex-M3"],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "Which Arduino board is specifically favored for its compact size, lacks a dedicated DC power jack, and is breadboard-friendly?",
    options: ["Arduino Mega", "Arduino Nano", "Arduino Leonardo", "Arduino UNO"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "In an Arduino sketch, what is the primary purpose of the setup() function?",
    options: [
      "It loops continuously to control the robot’s logic.",
      "It stores the power supply voltage values.",
      "It handles emergency stop procedures.",
      "It runs exactly once to initialize variables, pin modes, and libraries."
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    text: "A potentiometer connected to an Arduino analog pin (e.g., A0) will return an integer value ranging between:",
    options: ["0 to 255", "0 to 180", "0 to 1023", "-100 to 100"],
    correctAnswer: 2
  },
  {
    id: 5,
    text: "The HC-SR04 ultrasonic sensor determines distance by emitting sound waves at what frequency?",
    options: ["20 Hz", "10 kHz", "40 kHz", "2.4 GHz"],
    correctAnswer: 2
  },
  {
    id: 6,
    text: "Which calculation accurately determines the distance of an object using the time (µs) returned by the HC-SR04 sensor?",
    options: [
      "Distance = Time × 0.0343",
      "Distance = (Time × 0.0343) / 2",
      "Distance = (Time / 2) × 343",
      "Distance = Time / 0.0343"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    text: "The MPU6050 is an Inertial Measurement Unit (IMU). Which two sensors does it combine?",
    options: [
      "Magnetometer and Barometer",
      "Accelerometer and Ultrasonic",
      "Accelerometer and Gyroscope",
      "Gyroscope and Compass"
    ],
    correctAnswer: 2
  },
  {
    id: 8,
    text: "What is the main advantage of the HC-05 Bluetooth module compared to the HC-06?",
    options: [
      "The HC-05 has a longer range (up to 1km).",
      "The HC-05 operates on 12V directly.",
      "The HC-05 can be configured as either a Master or a Slave.",
      "The HC-05 uses I2C communication instead of UART."
    ],
    correctAnswer: 2
  },
  {
    id: 9,
    text: "If a servo motor is sent a Pulse Width Modulation (PWM) signal of 1.5 ms, what position will it move to?",
    options: ["0 degrees", "90 degrees (neutral)", "180 degrees", "It will spin continuously"],
    correctAnswer: 1
  },
  {
    id: 10,
    text: "Why is the L298N Motor Driver necessary to control standard DC motors using an Arduino?",
    options: [
      "The Arduino digital pins cannot provide enough electrical current to spin a motor.",
      "The L298N module provides the WiFi connection for the motors.",
      "DC motors only run on AC voltage, which the L298N creates.",
      "The Arduino cannot generate PWM signals on its own."
    ],
    correctAnswer: 0
  },
  {
    id: 11,
    text: "What primary advantage does the PCA9685 module offer for the 4-Legged Spider robot project?",
    options: [
      "It replaces the need for a battery by drawing power from the air.",
      "It adds artificial intelligence to the leg movements.",
      "It allows control of up to 16 servos using only 2 I2C pins from the Arduino.",
      "It makes the standard servos rotate a full 360 degrees."
    ],
    correctAnswer: 2
  },
  {
    id: 12,
    text: "In the context of the Robotic Arm project, what does ”DOF” stand for?",
    options: ["Direction of Force", "Degrees of Freedom", "Distance Output Factor", "Digital Oscillation Frequency"],
    correctAnswer: 1
  },
  {
    id: 13,
    text: "What does the Arduino map() function do in the Robotic Arm’s analog control strategy?",
    options: [
      "It creates a 3D map of the environment using the ultrasonic sensor.",
      "It linearly translates the 0-1023 potentiometer input to a 0-180 servo angle output.",
      "It maps the Bluetooth connections between the master and slave modules.",
      "It calculates the inverse kinematics of the arm’s trajectory."
    ],
    correctAnswer: 1
  },
  {
    id: 14,
    text: "To maintain maximum stability, the 4-Legged Spider robot uses a ”Creep Gait.” What defines this specific gait?",
    options: [
      "It jumps with all four legs simultaneously.",
      "It drags its body along the ground to lower the Center of Gravity.",
      "It lifts two diagonal legs at the same time.",
      "It only lifts one leg at a time, keeping three legs planted in a stable triangle."
    ],
    correctAnswer: 3
  },
  {
    id: 15,
    text: "In the Biped Cat robot, which servo motors are primarily responsible for tilting the robot left and right to shift its Center of Gravity?",
    options: ["The hip servos", "The ankle servos", "The knee servos", "The tail servos"],
    correctAnswer: 1
  },
  {
    id: 16,
    text: "In the Self-Balancing Robot, what mathematical mechanism calculates how fast the wheels should drive to keep the robot upright?",
    options: ["Inverse Kinematics", "A PID (Proportional, Integral, Derivative) Controller", "A Fast Fourier Transform (FFT)", "Linear Regression"],
    correctAnswer: 1
  },
  {
    id: 17,
    text: "Within a PID control loop, what is the purpose of the ”Integral (I)” parameter?",
    options: [
      "To predict future errors and prevent oscillation.",
      "To react immediately to sudden, large tilts.",
      "To accumulate past errors to eliminate steady-state error (e.g., if weight is off-center).",
      "To communicate with the motor driver."
    ],
    correctAnswer: 2
  },
  {
    id: 18,
    text: "To get a clean, accurate angle for the Self-Balancing Robot, what algorithm is used to fuse data from the Accelerometer and Gyroscope?",
    options: ["A Complementary Filter", "A Low-Pass Audio Filter", "A Neural Network", "Dijkstra’s Algorithm"],
    correctAnswer: 0
  },
  {
    id: 19,
    text: "What core logic condition makes the Autonomous Ultrasonic Car stop?",
    options: [
      "If the WiFi connection is lost.",
      "If the calculated distance to an object is greater than 20 cm.",
      "If the calculated distance to an object is less than or equal to the safety threshold (e.g., 20 cm).",
      "If the battery voltage drops below 3.3V."
    ],
    correctAnswer: 2
  },
  {
    id: 20,
    text: "A student connects four SG90 servos directly to the Arduino’s 5V pin. Whenever the servos move, the Arduino restarts. What is the most likely cause?",
    options: [
      "The code is trapped in an infinite loop().",
      "The servos draw too much current, causing a voltage drop that resets the microcontroller.",
      "The PWM signals are colliding on the digital pins.",
      "The servos are wired backward, causing a short circuit."
    ],
    correctAnswer: 1
  }
];