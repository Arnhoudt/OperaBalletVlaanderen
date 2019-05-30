import React from "react";
import { inject, observer, PropTypes } from "mobx-react";
//import styles from "./Answers.module.css";



const BinaryQuestion = ({ questionStore }) => {
    const handleChangeBinaryQuestion = e =>{
        questionStore.nextQuestion();
    }

    return (
            <div>
                <button onChange={handleChangeBinaryQuestion}>Yes</button>
                <button onChange={handleChangeBinaryQuestion}>No</button>
            </div>
    );
};

BinaryQuestion.propTypes = {
    questionStore: PropTypes.observableObject.isRequired
};

export default inject(`questionStore`)(observer(BinaryQuestion));
