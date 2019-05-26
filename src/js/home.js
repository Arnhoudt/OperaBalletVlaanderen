{
    let stats = {
        happy : 0,
        smart : 0,
        unicorn : 0
    }
    let answerArray = [];
    let characters = [];
  const init = () =>{
      console.log("bliep bliep bliep javascript is working, let's build this awesome site!");

      $characters = Array.prototype.slice.call(document.querySelectorAll('.character'));
      $characters.forEach(character =>{
          characters.push([character.querySelector('.characterName').textContent,character.querySelector('.CharacterStatValueHappy').textContent,character.querySelector('.CharacterStatValueSmart').textContent,character.querySelector('.CharacterStatValueUnicorn').textContent]);
      })
      values = document.getElementsByClassName('statValue');
      answers = Array.prototype.slice.call(document.getElementsByClassName(('answer')));
      answers.forEach(answer => {
          answer.addEventListener('click', handleChangeRadioButton);
      })
  }

  const handleChangeRadioButton = e =>{
    if(e.currentTarget.value === "true" && answerArray[e.currentTarget.parentElement.parentElement.getAttribute("number")] != true) {
        answerArray[e.currentTarget.parentElement.parentElement.getAttribute("number")] = true;
        stats.happy += parseInt(e.currentTarget.parentElement.parentElement.querySelector(".valueHappy").textContent);
        stats.smart += parseInt(e.currentTarget.parentElement.parentElement.querySelector(".valueSmart").textContent);
        stats.unicorn += parseInt(e.currentTarget.parentElement.parentElement.querySelector(".valueUnicorn").textContent);
    }
    if(e.currentTarget.value === "false" && answerArray[e.currentTarget.parentElement.parentElement.getAttribute("number")] != false && answerArray[e.currentTarget.parentElement.parentElement.getAttribute("number")] != undefined){
        console.log(answerArray[e.currentTarget.parentElement.parentElement.getAttribute("number")]);
        answerArray[e.currentTarget.parentElement.parentElement.getAttribute("number")] = false;
        stats.happy -= parseInt(e.currentTarget.parentElement.parentElement.querySelector(".valueHappy").textContent);
        stats.smart -= parseInt(e.currentTarget.parentElement.parentElement.querySelector(".valueSmart").textContent);
        stats.unicorn -= parseInt(e.currentTarget.parentElement.parentElement.querySelector(".valueUnicorn").textContent);
    }
    updateValues();

    let lowestDifference = 31415926535;
    let bestCharacter = [];
    characters.forEach(character =>{
        let difference = 0;
        difference += Math.pow(Math.abs(stats.happy - character[1]), 2);
        difference += Math.pow(Math.abs(stats.smart - character[2]), 2);
        difference += Math.pow(Math.abs(stats.unicorn - character[3]), 2);
        if(difference<lowestDifference){
            lowestDifference = difference;
            bestCharacter = character;
        }
    });
    $yourCharacter = document.querySelector('.yourCharacter');
    $yourCharacter.querySelector('.yourCharacterName').textContent = bestCharacter[0];
    $yourCharacter.querySelector('.yourCharacterStatValueHappy').textContent = bestCharacter[1];
    $yourCharacter.querySelector('.yourCharacterStatValueSmart').textContent = bestCharacter[2];
    $yourCharacter.querySelector('.yourCharacterStatValueUnicorn').textContent = bestCharacter[3];
  }

  const updateValues = () =>{
      document.querySelector(".statValueHappy").textContent = stats.happy.toString();
      document.querySelector(".statValueSmart").textContent = stats.smart.toString();
      document.querySelector(".statValueUnicorn").textContent = stats.unicorn.toString();
  }

  init();
}