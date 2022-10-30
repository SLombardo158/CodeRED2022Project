import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import React, { Component } from 'react';
import { NextPageContext } from 'next'



class Car extends React.Component { 
    
    static async getInitialProps(ctx) {
        const res = await fetch('https://api.github.com/repos/vercel/next.js')
        const json = await res.json()
        return { stars: json.stargazers_count }
    }

    constructor(x,y,width,height){

        super();

        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;

        this.sensor=new Sensor(this);
        this.controls = new controls();
    }
    


    // update(){
    //     this.#move();
    //     this.sensor.update();
    // }

    // #move(){
    //     if(this.controls.forward){
    //         this.speed+=this.acceleration;
    //     }
    //     if(this.controls.reverse){
    //         this.speed-=this.acceleration;
    //     }

    //     if(this.speed>this.maxSpeed){
    //         this.speed=this.maxSpeed;
    //     }
    //     if(this.speed<-this.maxSpeed/2){
    //         this.speed=-this.maxSpeed/2;
    //     }

    //     if(this.speed>0){
    //         this.speed-=this.friction;
    //     }
    //     if(this.speed<0){
    //         this.speed+=this.friction;
    //     }
    //     if(Math.abs(this.speed)<this.friction){
    //         this.speed=0;
    //     }

    //     if(this.controls.left){
    //         this.angle+=0.03;
    //     }
    //     if(this.controls.right){
    //         this.angle-=0.03;
    //     } 
    //     this.x-=Math.sin(this.angle)*this.speed;
    //     this.y-=Math.cos(this.angle)*this.speed;
    // }

    // draw(ctx){
    //     ctx.save();
    //     ctx.translate(this.x,this.y);
    //     ctx.rotate(-this.angle);
    //     //ctx.strokeStyle="yellow";
    //     ctx.beginPath();
    //     ctx.rect(
    //         -this.width/2,
    //         -this.height/2,
    //         this.width,
    //         this.height
    //     );
    //     ctx.fill();

    //     ctx.restore();

    //     this.sensor.draw(ctx);
    // }

    // onFocus() {
    //   this.myInput.setAttribute("class", "highlight");
    // }
  
    // onBlur() {
    //   this.myInput.setAttribute("class", "");
    // }

    // const ref = useRef(null);

    // useEffect(() => { 
    //     // 👇️ (better) use a ref
    //     const el2 = ref.current;
    //     console.log(el2);
    // }, []);
    
    render() {
    
      return (
        <div>
            <div>
                <h2 ref={ref => {this.friction}} id="my-element">
                    Some content here
                </h2>
            </div>
          {/* <input
            ref={input => {
              this.myInput = input;
            }}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
          /> */}
        </div>
      );
    }
  }

  export default Car;