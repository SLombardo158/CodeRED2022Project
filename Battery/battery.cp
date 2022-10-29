//
//  main.cpp
//  CodeRED Hackathon
//
//  Created by Shahad Alghamdi on 10/29/22.
//

#include <iostream>
#include <cmath>
#include <string>
using namespace std;

class Zone{
public:
    
    // Data fields
    int type; // 1: Charging Stations | 2: Internet Zone | 3: Both
    double x;
    double y;
    
    // Constructors
    Zone(int type1, double x1, double y1){
        type = type1;
        x = x1;
        y = y1;
    }
    
    // Functions
    void changeX(double x1){
        x = x1;
    }
    void changeY(double y1){
        y = y1;
    }
    void changeType(int type1){
        type = type1;
    }
    double getX(){
        return x;
    }
    double getY(){
        return y;
    }
    string getType(){
        if (type == 1){
            return "Charging Stations";
        } else if (type == 2){
            return "Internet Zone";
        } else if (type == 3) {
            return "Both";
        } else {
            return "ERROR: Invalid Type";
        }
    }
};

class Rover{
public:
    double x;
    double y;
    int state; // 1: resting | 2: moving
    int speed;
    int battery;
    
    Rover(double x1, double y1, int state1 = 1){
        x = x1;
        y = y1;
        state = state1;
        speed = 2;
        battery = 100;
    }
    
    void setX(double x1){
        x = x1;
    }
    void setY(double y1){
        y = y1;
    }
    void setState(int state1){
        state = state1;
    }
    void setBattery(int battery1){
        battery = battery1;
    }
    double getX(){
        return x;
    }
    double getY(){
        return y;
    }
    int getState(){
        return state;
    }
    double getBatteryUsage(){
        if (state == 1){
            return 0.0025;
        } else if (state == 2){
            return 0.01;
        } else {
            return -1;
        }
    }
    int getSpeed(){
        return speed;
    }
    int getBattery(){
        return battery;
    }
    
};

double getDistance(Zone& zone, Rover& rover){
    return sqrt(pow(zone.getX() - rover.getX(), 2) + pow(zone.getY() - rover.getY(), 2));
}

void reduceBattery(Rover& rover){
    rover.setBattery(rover.getBattery() - rover.getBatteryUsage());
}

double getBatteryTime(Rover& rover){
    
}

int main(){
    
    
    
    return 0;
}
