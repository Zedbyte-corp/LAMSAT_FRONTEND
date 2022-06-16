import React from "react";
const ClassNames = require('classnames');
const PropTypes = require('prop-types');
const ObjectAssign = require('object-assign');


const propTypes = {
    disabled: PropTypes.bool,
    hasError: PropTypes.bool,
    defaultChecked: PropTypes.bool,    
    checked: PropTypes.bool,
    help: PropTypes.string,
    inputClasses: PropTypes.object,
    groupClasses: PropTypes.object,
    label: PropTypes.array,
    hideLabel: PropTypes.bool,
    labelClasses: PropTypes.object,
    labelFor: PropTypes.string,
    labelPositionBottom: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    defaultValue : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    isKeyEnable: PropTypes.bool,
};
const defaultProps = {
    type: 'checkbox',
};
const Checkbox = (props) => {
    const inputClasses = ClassNames(ObjectAssign({
        'form-control': false
    }, props.inputClasses));
//class Checkbox extends React.Component {
  
       
        return (
            <input
                type={props.type}
                key={ props.isKeyEnable ? `${Math.floor((Math.random() * 1000))}-${props.name}` : ""}
                className={inputClasses}
                name={props.name}
                id={props.id}
                value={props.value}
                checked={props.checked}
                onChange={props.onChange}
                defaultValue={props.defaultValue}
                defaultChecked={props.defaultChecked}
            />
        );
    
}

export default Checkbox;