//
//  main.cpp
//  CodeRED Hackathon
//
//  Created by Shahad Alghamdi on 10/29/22.
//

#include <iostream>
#include <cmath>
#include <string>
#include <chrono>
using namespace std;



class Zone{
public:
    
    // Data fields
    int type; // 1: Charging Stations | 2: Internet Zone | 3: Both
    double x; // x coordinates
    double y; // y coordinates
    
    // Constructor
    Zone(int type1, double x1, double y1){
        type = type1;
        x = x1;
        y = y1;
    }
    
    // Functions
    void setX(double x1){
        x = x1;
    }
    void setY(double y1){
        y = y1;
    }
    void setType(int type1){
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
    // Constructor
    Rover(double x1, double y1, int state1 = 1){
        x = x1;
        y = y1;
        state = state1;
        battery = 100.0; // mAh ( just a value for testing )
    }
    
    // setter functions:
    void setX(double x1){
        x = x1;
    }
    void setY(double y1){
        y = y1;
    }
    void setState(int state1){
        state = state1;
    }
    void setBattery(double battery1){
        battery = battery1;
    }
    
    // getter functions
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
            return -1; // if the state is not resting or moving (ERROR)
        }
    }
    int getSpeed(){
        return SPEED;
    }
    double getBattery(){
        return battery;
    }
    
private:
    // Data fields:
    double x; // x coordinate
    double y; // y coordinate
    int state; // 1: resting | 2: moving
    const double SPEED = 2.0; // a given speed at 2 m/h
    double battery; // the battery capacity
};


// Calculate the distance between the rover and an indecated zone
double getDistance(Zone& zone, Rover& rover){
    return sqrt(pow(zone.getX() - rover.getX(), 2) + pow(zone.getY() - rover.getY(), 2));
}


// reduces the battery depending on the rover state
// If moving : -1% per hour
// if resting : -0.25% per hour
void reduceBattery(Rover& rover){
    rover.setBattery(rover.getBattery() - (rover.getBatteryUsage() * rover.getBattery()));
}


// calculates the time taken to reach a certain zone (in hours)
double destinationTime(Zone& zone, Rover& rover){
    return getDistance(zone, rover) / rover.getSpeed();
}


// This function evaluates the distance between the rover and the zone indecated, and then calculates the battery used to reach that zone.
void stateBatteryReduction(Rover& rover){
    if (rover.getState() == 2){
        reduceBattery(rover);
    } else if (rover.getState() == 1){
        reduceBattery(rover);
    }
}


// the battery is charged 1% per min
void chargeBattery(Rover& rover){
    rover.setBattery(rover.getBattery() + (rover.getBattery() * 0.01));
    if (rover.getBattery() > 100){
        rover.setBattery(100);
    }
}


int main(){
    
    // Welcome to my messy testin zone :D
    
    Zone alpha(1, 9, 8);
    Zone bravo(1, 5, 6);
    Rover rover(0, 0, 2); // moving
    Rover rover2(0, 0); // resting
    
    cout << "---------------------------------------------------" << endl;
    
    cout << "The distance between the rover and Alpha: " << getDistance(alpha, rover) << " miles" << endl;
    
    cout << "---------------------------------------------------" << endl;
    
    cout << "Moving rover battery: " << rover.getBattery() << " and battery usage: " << rover.getBatteryUsage() << endl;
    
    
    cout << "---------------------------------------------------" << endl;
    
    cout << "The battery after reaching alpha: "<< rover.getBattery() << endl;
    
    chargeBattery(rover); // well .. charge battery :)
    
    cout << "---------------------------------------------------" << endl;
    
    cout << "Battery after charging: "<< rover.getBattery() << endl;
    
    cout << "---------------------------------------------------" << endl;
    
    cout << "Time taken to reach alpha: "<< destinationTime(alpha, rover) << " hours" << endl;
    
    cout << "---------------------------------------------------" << endl;
    
    // just a simple if statement to check if the distace function works
    if (getDistance(alpha, rover) >= getDistance(bravo, rover)){
        cout << "alpha is far" << endl;
    } else {
        cout << "nvm" << endl;
    }
    cout << "---------------------------------------------------" << endl;
    
    cout << endl;
    
    
    
    //clock
    
    char input = 'y';
    int h = 1;
    int m = 1;
    int s = 1;
    int t = 1;
    
    while (input != 'q'){
        for (h = 1; h <= 2; h++){ // hours
            for (m = 1; m <= 3; m++){ // min
                for (s = 1; s <= 4; s++){ // sec
                    for (t = 1; t <= 5; t++){} // delay
                    cout << "sec: " << s << endl;
                    // every sec that passes :
                    // record a second
                    
                    
                    // if at internet zone: -10GB
                    
                    
                }
                cout << "min: " << m << endl;
                // every min:
                // if at chargin station : +1% battery
                chargeBattery(rover);
                // check for nearest zone:
                
                
            }
            cout << "hour: " << h << endl;
            // if moving : -1% battery
            // if resting: -0.25% battery
            stateBatteryReduction(rover);
            
        }
        cout << "input: ";
        cin >> input;
        cout << endl;
    }
    
    cout << rover.getBattery() << endl;
    
    return 0;
}


/// Things to polish:
/// [] A function that reduces the battery at a resting state by using time
/// [] A function that test whether the rover is at a chargin station or not ( could be a bool )
/// [] Decide whether to decrease the battery in regards to time or distance
