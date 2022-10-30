//  main.cpp
//  CodeRED Hackathon 2022

//Implement a mechanism to prevent Devices from running out of space while 
//recording Field Events during Field Activities – such as detecting the rate in 
//which the space is consumed by a Field Application and directing Autonomous or 
//Personal Devices to the nearest Internet Availability Zone before the Device runs out of space.
//Use Android API’s to detect?

//Field activity- activities that take place within a field,
//  including: inspect field equipment, perform maintenance on
//  Field Equipment
//  Observe and record Field Events

//Field Events- events ocurring in a Field that are being monitored
//  which have a possible impace on Field Equipment, including
//  weather events, internet availability going on/off, and
//  geographical events

//Field- Geographical zone where devices and personnel would 
//  perform FIeld Activities which result in calling API operations
//  which include: date and time of when field measurement
//  was taken, location where taken, and field info (at least
//  info on aduivisual info and textual info)


#include <iostream>
#include <cmath>
#include <string>
#include <queue>
#include <vector>
using namespace std;

class Zone {
public:

    // Data fields
    int type; // 1: Charging Stations | 2: Internet Zone | 3: Both
    double x;
    double y;

    // Constructors
    Zone(int type1, double x1, double y1) {
        type = type1;
        x = x1;
        y = y1;
    }

    // Functions
    void changeX(double x1) {
        x = x1;
    }
    void changeY(double y1) {
        y = y1;
    }
    void changeType(int type1) {
        type = type1;
    }
    double getX() {
        return x;
    }
    double getY() {
        return y;
    }
    string getType() {
        if (type == 1) {
            return "Charging Stations";
        }
        else if (type == 2) {
            return "Internet Zone";
        }
        else if (type == 3) {
            return "Both";
        }
        else {
            return "ERROR: Invalid Type";
        }
    }
};

const Zone hotel(1, 1350, 150); //farthest right
const Zone golf(2, -30, 200);
const Zone foxtrot(1, -600, -80); //middle
const Zone echo(1, -200, 300);
const Zone delta(2, -400, -10); //most bottom
const Zone charlie(1, -100, -350);
const Zone beta(2, 640, -140);
const Zone alpha(2, 580, -50);

vector<Zone> allBatteryZone = {hotel, foxtrot, echo, charlie};
vector<Zone> allInternetZone = {golf, delta, beta, alpha};

class Rover {
private:
    // Data fields:
    double x; // x coordinate
    double y; // y coordinate
    int state; // 1: resting | 2: moving
    const double SPEED = 2.0; // a given speed at 2 m/h
    double battery; // the battery capacity

    double recordTime;
    //// 1: part to upload | 2. part that stays
    queue<int> storage1; //2 will also be uploaded but kept to sync map data
    int storage;
    int maxStorage = 10; //TB; 8,000,000 Megabits per second in a Terabyte per second.
    const int lowRate = 50; //Avg Mbps for low frame rate
    const int highRate = 75; //Avg Mbps for high frame rate
    bool inZone;

public:
    // Constructor
    Rover(double x1, double y1, int state1 = 1) {
        x = x1;
        y = y1;
        state = state1;
        battery = 100.0; // mAh ( just a value for testing )
        recordTime = 0;
        storage = 0;
        inZone = 0;
        storage1.push(storage);
    }

    // setter functions:
    void setX(double x1) {
        x = x1;
    }
    void setY(double y1) {
        y = y1;
    }
    void setState(int state1) {
        state = state1;
    }
    void setBattery(double battery1) {
        battery = battery1;
    }

    // getter functions
    double getX() {
        return x;
    }
    double getY() {
        return y;
    }
    int getState() {
        return state;
    }
    double getBatteryUsage() {
        if (state == 1) {
            return 0.0025;
        }
        else if (state == 2) {
            return 0.01;
        }
        else {
            return -1; // if the state is not resting or moving (ERROR)
        }
    }
    int getSpeed() {
        return SPEED;
    }
    double getBattery() {
        return battery;
    }

    //storage starts here**
    int getTime() {
        return recordTime;
    }

    int getStorage() {
        return storage;
    }

    bool insideZone() { //checks if in zone to upload video
        if (inZone == 2 || inZone == 3)
            return true;
    }

    void updateVideo()//adds recording to the queue
    {
        storage1.front() = storage;
    }

    void reduceStorage(Rover& rover);
    void uploadStorage(Rover& rover);
};

// Calculate the distance between the rover and an indecated zone
double getDistance(Zone & zone, Rover & rover) {
    return sqrt(pow(zone.getX() - rover.getX(), 2) + pow(zone.getY() - rover.getY(), 2));
}

Zone getBestZone(int type, Rover& rover) //finds closest zone 
{
    int zoneLoc = 0;
    if (type == 1) {
        int shortestDist = getDistance(allBatteryZone[0], rover);
        for (int i = 0; i < allBatteryZone.size(); i++)
        {
            if (getDistance(allBatteryZone[i], rover) < shortestDist)
            {
                shortestDist = getDistance(allBatteryZone[i], rover);
                zoneLoc = i;
            }
        }
        return allBatteryZone[zoneLoc];
    }

    if (type == 2) {
        int shortestDist = getDistance(allInternetZone[0], rover);
        for (int i = 0; i < allInternetZone.size(); i++)
        {
            if (getDistance(allInternetZone[i], rover) < shortestDist)
            {
                shortestDist = getDistance(allInternetZone[i], rover);
                zoneLoc = i;
            }
        }
        return allInternetZone[zoneLoc];
    }
    return allBatteryZone[0]; //default zone to return
}


// reduces the battery depending on the rover state
// If moving : -1% per hour
// if resting : -0.25% per hour
void reduceBattery(Rover& rover) {
    rover.setBattery(rover.getBattery() - (rover.getBatteryUsage() * rover.getBattery()));
}


// calculates the time taken to reach a certain zone (in hours)
double destinationTime(Zone& zone, Rover& rover) {
    return getDistance(zone, rover) / rover.getSpeed();
}


// This function evaluates the distance between the rover and the zone indecated, and then calculates the battery used to reach that zone.
void stateBatteryReduction(Zone& zone, Rover& rover) {
    if (rover.getState() == 2) {
        for (double i = getDistance(zone, rover); i > 0; (i -= 2)) {
            reduceBattery(rover);
        }
    }
    else if (rover.getState() == 1) {
        cout << "The rover is at a resting state." << endl;
    }
}


// the battery is charged 1% per min
void chargeBattery(Rover& rover) {
    while (rover.getBattery() <= 100) {
        rover.setBattery(rover.getBattery() + (rover.getBattery() * 0.01));
    }
    if (rover.getBattery() > 100) {
        rover.setBattery(100);
    }
}

void Rover::reduceStorage(Rover& rover)
{
    int time = getTime(); // in seconds;
    storage -= time * (75 / 8000000); //75 Mbps used for high frame rate
    if (storage <= 2) //if storage is at 20% or less capacity
    {
        cout << "WARNING: Storage is low. Finding nearest internet zone..." << endl;

    }
}

void Rover::uploadStorage(Rover& rover)
{
    if (insideZone()) {
        //8,000 Gigabits per second in a Terabyte per second.
        while (storage != 10)
        {
            int second = 0; //implement real time seconds here
            storage += 8000 * second;
        }
        cout << "Upload done!" << endl;
    }
}



int main() {

    // Welcome to my messy testin zone :D

    Zone alpha(1, 9, 8);
    Zone bravo(1, 5, 6);
    Rover rover(0, 0, 2); // moving
    Rover rover2(0, 0); // resting

    cout << "---------------------------------------------------" << endl;

    cout << "The distance between the rover and Alpha: " << getDistance(alpha, rover) << " miles" << endl;

    cout << "---------------------------------------------------" << endl;

    cout << "Moving rover battery: " << rover.getBattery() << " and battery usage: " << rover.getBatteryUsage() << endl;

    stateBatteryReduction(alpha, rover); // reduces the battery according to the distance taken to reach alpha zone

    cout << "---------------------------------------------------" << endl;

    cout << "The battery after reaching alpha: " << rover.getBattery() << endl;

    chargeBattery(rover); // well .. charge battery :)

    cout << "---------------------------------------------------" << endl;

    cout << "Battery after charging: " << rover.getBattery() << endl;

    cout << "---------------------------------------------------" << endl;

    cout << "Time taken to reach alpha: " << destinationTime(alpha, rover) << " hours" << endl;

    cout << "---------------------------------------------------" << endl;

    // just a simple if statement to check if the distace function works
    if (getDistance(alpha, rover) >= getDistance(bravo, rover)) {
        cout << "alpha is far" << endl;
    }
    else {
        cout << "nvm" << endl;
    }
    cout << "---------------------------------------------------" << endl;

    //clock

    char input = 'y';
    int h = 1;
    int m = 1;
    int s = 1;
    int t = 1;

    while (input != 'q') {
        for (h = 1; h <= 2; h++) { // hours
            for (m = 1; m <= 3; m++) { // min
                for (s = 1; s <= 4; s++) { // sec
                    for (t = 1; t <= 5; t++) {} // delay
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