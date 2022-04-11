import React, { Component } from 'react';
import './Keyboard.css'

class KeyboardDisplay extends Component {

  onChange(charValue) {
    if (charValue === 1) {
      return 'gray' ;
    } 
    if (charValue === 2) {
      return 'yellow' ; 
    }
    if (charValue === 3) {
      return 'lime' ; 
    }
    if (charValue === 0) {
      return 'white' ; 
    }
  }

  render(){
    console.log(this.props.charColor[1]);
    return (
      <div className="wrapper noselect">
        <div className="q" style={{backgroundColor: this.onChange(this.props.charColor[16])}}>Q</div>
        <div className="w" style={{backgroundColor: this.onChange(this.props.charColor[22])}}>W</div>
        <div className="e" style={{backgroundColor: this.onChange(this.props.charColor[4])}}>E</div>
        <div className="r" style={{backgroundColor: this.onChange(this.props.charColor[17])}}>R</div>
        <div className="t" style={{backgroundColor: this.onChange(this.props.charColor[19])}}>T</div>
        <div className="y" style={{backgroundColor: this.onChange(this.props.charColor[24])}}>Y</div>
        <div className="u" style={{backgroundColor: this.onChange(this.props.charColor[20])}}>U</div>
        <div className="i" style={{backgroundColor: this.onChange(this.props.charColor[8])}}>I</div>
        <div className="o" style={{backgroundColor: this.onChange(this.props.charColor[14])}}>O</div>
        <div className="p" style={{backgroundColor: this.onChange(this.props.charColor[15])}}>P</div>
        <div className="hold1">s</div>
        <div className="a" style={{backgroundColor: this.onChange(this.props.charColor[0])}}>A</div>
        <div className="s" style={{backgroundColor: this.onChange(this.props.charColor[18])}}>S</div>
        <div className="d" style={{backgroundColor: this.onChange(this.props.charColor[3])}}>D</div>
        <div className="f" style={{backgroundColor: this.onChange(this.props.charColor[5])}}>F</div>
        <div className="g" style={{backgroundColor: this.onChange(this.props.charColor[6])}}>G</div>
        <div className="h" style={{backgroundColor: this.onChange(this.props.charColor[7])}}>H</div>
        <div className="j" style={{backgroundColor: this.onChange(this.props.charColor[9])}}>J</div>
        <div className="k" style={{backgroundColor: this.onChange(this.props.charColor[10])}}>K</div>
        <div className="l" style={{backgroundColor: this.onChange(this.props.charColor[11])}}>L</div>
        <div className="hold2">s</div>
        <div className="z" style={{backgroundColor: this.onChange(this.props.charColor[25])}}>Z</div>
        <div className="x" style={{backgroundColor: this.onChange(this.props.charColor[23])}}>X</div>
        <div className="c" style={{backgroundColor: this.onChange(this.props.charColor[2])}}>C</div>
        <div className="v" style={{backgroundColor: this.onChange(this.props.charColor[21])}}>V</div>
        <div className="b" style={{backgroundColor: this.onChange(this.props.charColor[1])}}>B</div>
        <div className="n" style={{backgroundColor: this.onChange(this.props.charColor[13])}}>N</div>
        <div className="m" style={{backgroundColor: this.onChange(this.props.charColor[12])}}>M</div>
    </div>
    );
  }
}
export default KeyboardDisplay
