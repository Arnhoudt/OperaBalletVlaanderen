import React, { useState, useEffect } from "react";
import {inject, observer, PropTypes} from "mobx-react";
import { withRouter } from "react-router-dom";
import Stats from "./Stats";

//import styles from "./Answers.module.css";

const Character = ({ params, characterStore }) => {
    const [bestCharacter, setBestCharacter] = useState(0);
    useEffect(() => {
        const f = async () => {
            const characters = await characterStore.findAll();

            let bestCharacterScore = 314159235;
            characters.map(character =>{
                let score = 0;
                score+=Math.pow(Math.abs(character.param1-params[0]),2);
                score+=Math.pow(Math.abs(character.param2-params[1]),2);
                score+=Math.pow(Math.abs(character.param3-params[2]),2);
                score+=Math.pow(Math.abs(character.param4-params[3]),2);
                score+=Math.pow(Math.abs(character.param5-params[4]),2);
                if(score<bestCharacterScore){
                    bestCharacterScore = score;
                    setBestCharacter(character);
                }
            })
        }
        f();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(bestCharacter === undefined){
        return (<p>loading your character</p>)
    }else{
        return (
            <>
                <div key='character'>
                    <p>jouw karakter is</p>
                    <p>{bestCharacter.name}</p>
                    <div>
                        <p>de stats van jouw karakter zijn</p>
                        <Stats params={[bestCharacter.param1, bestCharacter.param2, bestCharacter.param3, bestCharacter.param4, bestCharacter.param5]} />
                    </div>
                </div>
            </>
        );
    }
};

Character.propTypes = {
    characterStore: PropTypes.observableObject.isRequired
};

export default inject(`characterStore`)(
    withRouter(observer(Character))
);
