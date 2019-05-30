import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";

const handleChangeBinaryQuestion = e =>{
    console.log(e.currentTarget);
}

const BinaryQuestion = ( ) => {
    return (
            <div>
                <div>
                    <input
                        type="radio"
                        name="question"
                        id="optionsRadios1"
                        value="true"
                        onChange={handleChangeBinaryQuestion}
                    />
                    <label for="optionsRadios1">Yes</label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="question"
                        id="optionsRadios2"
                        value="false"
                        onChange={handleChangeBinaryQuestion}
                    />
                    <label for="optionsRadios2">No</label>
                </div>
            </div>
    );
};

export default BinaryQuestion;
