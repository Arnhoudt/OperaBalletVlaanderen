{
  const stats = {
    happy: 0,
    smart: 0,
    unicorn: 0
  };
  const answerArray = [];
  const characters = [];
  const init = () => {
    console.log(
      'bliep bliep bliep javascript is working, let\'s build this awesome site!'
    );

    const $characters = Array.prototype.slice.call(
      document.querySelectorAll('.character')
    );
    $characters.forEach(character => {
      characters.push([
        character.querySelector('.characterName').textContent,
        character.querySelector('.CharacterStatValueHappy').textContent,
        character.querySelector('.CharacterStatValueSmart').textContent,
        character.querySelector('.CharacterStatValueUnicorn').textContent
      ]);
    });
    const $answers = Array.prototype.slice.call(
      document.getElementsByClassName('answer')
    );
    $answers.forEach(answer => {
      answer.addEventListener('click', handleChangeRadioButton);
    });
  };

  const countArray = (array) =>{
    let counter = 0;
    array.forEach(() =>{
        counter++;
    })
      return counter;
  }
  
  const handleChangeRadioButton = e => {
    let lowestDifference = 31415926535;
    let bestCharacter = [];
    characters.forEach(character => {
      let difference = 0;
      difference += Math.pow(Math.abs(stats.happy - character[1]), 2);
      difference += Math.pow(Math.abs(stats.smart - character[2]), 2);
      difference += Math.pow(Math.abs(stats.unicorn - character[3]), 2);
      if (difference < lowestDifference) {
        lowestDifference = difference;
        bestCharacter = character;
      }
    });
    const $yourCharacter = document.querySelector('.yourCharacter');
    $yourCharacter.querySelector('.yourCharacterName').textContent =
      bestCharacter[0];
    $yourCharacter.querySelector('.yourCharacterStatValueHappy').textContent =
      bestCharacter[1];
    $yourCharacter.querySelector('.yourCharacterStatValueSmart').textContent =
      bestCharacter[2];
    $yourCharacter.querySelector('.yourCharacterStatValueUnicorn').textContent =
      bestCharacter[3];
      if (
          e.currentTarget.value === 'true' &&
          answerArray[
              e.currentTarget.parentElement.parentElement.parentElement.getAttribute('number')
              ] !== true
      ) {
          answerArray[
              e.currentTarget.parentElement.parentElement.parentElement.getAttribute('number')
              ] = true;
          console.log("the next number is ");
          console.log(e.currentTarget.parentElement.parentElement.parentElement);

          stats.happy += parseInt(
              e.currentTarget.parentElement.parentElement.parentElement.querySelector('.valueHappy')
                  .textContent
          )/countArray(answerArray);
          stats.smart += parseInt(
              e.currentTarget.parentElement.parentElement.parentElement.querySelector('.valueSmart')
                  .textContent
          )/countArray(answerArray);
          stats.unicorn += parseInt(
              e.currentTarget.parentElement.parentElement.parentElement.querySelector(
                  '.valueUnicorn'
              ).textContent
          )/countArray(answerArray);
      }
      if (
          e.currentTarget.value === 'false' &&
          answerArray[
              e.currentTarget.parentElement.parentElement.parentElement.getAttribute('number')
              ] !== false &&
          answerArray[
              e.currentTarget.parentElement.parentElement.parentElement.getAttribute('number')
              ] !== undefined
      ) {
          answerArray[
              e.currentTarget.parentElement.parentElement.parentElement.getAttribute('number')
              ] = false;
          let $happy = e.currentTarget.parentElement.parentElement.parentElement.querySelector('.valueHappy');
          let $smart = e.currentTarget.parentElement.parentElement.parentElement.querySelector('.valueSmart');
          let $unicorn = e.currentTarget.parentElement.parentElement.parentElement.querySelector('.valueUnicorn')

          stats.happy -= parseInt($happy.textContent)/countArray(answerArray);
          stats.smart -= parseInt($smart.textContent)/countArray(answerArray);
          stats.unicorn -= parseInt($unicorn.textContent)/countArray(answerArray);
      }
      updateValues();
      console.log(countArray(answerArray));
  };

  const updateValues = () => {
    document.querySelector(
      '.statValueHappy'
    ).textContent = (stats.happy/countArray(answerArray)).toString();
    document.querySelector(
      '.statValueSmart'
    ).textContent = (stats.smart/countArray(answerArray)).toString();
    document.querySelector(
      '.statValueUnicorn'
    ).textContent = (stats.unicorn/countArray(answerArray)).toString();
  };

  init();
}
