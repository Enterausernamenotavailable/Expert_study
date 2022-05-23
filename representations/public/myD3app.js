/*FIRST PAGE VALIDATION AND LOCAL DATA STORAGE********************************************************************************************** */
function validateForm() {
  var answers = "";
  var filled = true;

  //NATIONALITY 
  if (document.getElementById('nationality').value.length == 0) {
    filled = false;
  } else {
    answers += "Nationality: " + document.getElementById('nationality').value + "; ";
  }

  //GENDER 
  document.getElementById('gender_selfdescribe_text').setCustomValidity('');
  var gender_filled = false;
  var ele = document.getElementsByName('gender');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      if (ele[i].id == "gender_selfdescribe") {
        if (document.getElementById('gender_selfdescribe_text').value.length == 0) {
          document.getElementById('gender_selfdescribe_text').setCustomValidity('Please fill out this field.');
          document.getElementById('gender_selfdescribe_text').reportValidity();
        } else {
          answers += "Gender: Selfidentified " + document.getElementById('gender_selfdescribe_text').value + "; ";
          gender_filled = true;
        }
      } else {
        answers += "Gender: " + ele[i].value + "; ";
        gender_filled = true;
      }
    }
  }

  if (gender_filled == false) {
    filled = false;
  }

  //AGE
  document.getElementById('age').setCustomValidity('');
  if (document.getElementById('age').value.length == 0) {
    filled = false;
  } else if (document.getElementById('age').value < 18) {
    document.getElementById('age').setCustomValidity('Please fill in a number greater than 17.');
    document.getElementById('age').reportValidity();
    filled = false;
  } else {
    answers += "Age: " + document.getElementById('age').value + "; ";
  }

  //FIELD OF STUDY
  if (document.getElementById('field').value.length == 0) {
    filled = false;
  } else {
    answers += "Field of study/work: " + document.getElementById('field').value + "; ";
  }

  //BIOLOGY EXPERIENCE
  var biology_filled = false;
  var ele = document.getElementsByName('biology');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      answers += "Biology experience: " + ele[i].value + "; ";
      biology_filled = true;
    }
  }

  if (biology_filled == false) {
    filled = false;
  }


  //VIS EXPERIENCE
  var vis_filled = false;
  var ele = document.getElementsByName('vis_exp');
  answers += "Visualization experience: ";
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      answers += ele[i].value;
      if (i == ele.length - 1) {
        answers += "; ";
      } else {
        answers += ", ";
      }
      vis_filled = true;
      document.getElementById('vis_1').setCustomValidity('');
    }
  }

  if (vis_filled == false) {
    filled = false;
    document.getElementById('vis_1').setCustomValidity('Please select at least one of these options.');
    document.getElementById('vis_1').reportValidity();
  }

  //VISION
  document.getElementById('vision_text').setCustomValidity('');
  var vision_filled = false;
  var ele = document.getElementsByName('vision');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      if (ele[i].id == "vision_other") {
        if (document.getElementById('vision_text').value.length == 0) {
          document.getElementById('vision_text').setCustomValidity('Please fill out this field.');
          document.getElementById('vision_text').reportValidity();
        } else {
          answers += "Vision: " + document.getElementById('vision_text').value + "; ";
          vision_filled = true;
        }
      } else {
        answers += "Vision: " + ele[i].value + "; ";
        vision_filled = true;
      }
    }
  }

  if (vision_filled == false) {
    filled = false;
  }





  var input_elems = document.getElementsByTagName('input');
  for (i = input_elems.length - 1; i >= 0; i--) {
    input_elems[i].reportValidity();
  }

  if (filled) {
    

    var nextpage = "versions.html";
    

    sessionStorage.setItem("medvis_study_pg1_answers", answers);

    window.location.href = nextpage;
  }

}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/*SECOND PAGE********************************************************************************************** */
function fillAnswers() {
  var firstPageAnswers = sessionStorage.getItem("medvis_study_pg1_answers");
  document.getElementById('previous_answers').value = firstPageAnswers;



}

function validateFormPage2() {

  var filled = true;

  //Q8
  document.getElementById('Q8_Other_textfield').setCustomValidity('');
  document.getElementById('Q8_Simplistic').setCustomValidity('');

  var Q8_filled = false;
  var Q8_selected_other = false;
  var ele = document.getElementsByName('Q8[]');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      if (ele[i].id == "Q8_Other") {
        Q8_selected_other = true;
        if (document.getElementById('Q8_Other_textfield').value.length == 0) {
          document.getElementById('Q8_Other_textfield').setCustomValidity('Please fill out this field.');
          document.getElementById('Q8_Other_textfield').reportValidity();
        } else {
          Q8_filled = true;
        }
      } else {
        Q8_filled = true;
      }
    }
  }

  if (Q8_filled == false) {
    filled = false;
    if (Q8_selected_other != true) {
      document.getElementById('Q8_Simplistic').setCustomValidity('Please select at least one of these options.');
      document.getElementById('Q8_Simplistic').reportValidity();
    }
    return filled;
  }

  sessionStorage.removeItem("medvis_study_page_id");
  sessionStorage.removeItem("medvis_study_pg1_answers");
  return filled;
}

function clearOtherField() {
  if (!document.getElementById('Q8_Other').checked) {
    document.getElementById('Q8_Other_textfield').value = "";
  }
}


function clearCustomValidators() {
  document.getElementById('Q8_Other_textfield').setCustomValidity('');
  document.getElementById('Q8_Simplistic').setCustomValidity('');
}








/*SORTING QUESTIONS********************************************************************************************** */
let items = document.querySelectorAll("li.question7item");
let current = null;

items.forEach(item => {
  item.draggable = true;
  // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
  item.ondragstart = (ev) => {
    current = item;
    for (let it of items) {
      if (it != current) { it.classList.add("hint"); }
    }
  };

  // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
  item.ondragenter = (ev) => {
    if (item != current) { item.classList.add("active"); }
  };

  // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
  item.ondragleave = () => {
    item.classList.remove("active");
  };

  // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
  item.ondragend = () => {
    for (let it of items) {
      it.classList.remove("hint");
      it.classList.remove("active");
    }
  };

  // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
  item.ondragover = (evt) => {
    evt.preventDefault();
    if (item != current) {
      let currentpos = 0, droppedpos = 0;
      for (let it = 0; it < items.length; it++) {
        if (current == items[it]) { currentpos = it; }
        if (item == items[it]) { droppedpos = it; }
      }
      if (currentpos < droppedpos) {
        item.parentNode.insertBefore(current, item.nextSibling);
      } else {
        item.parentNode.insertBefore(current, item);
      }
    }
    items = document.querySelectorAll("li.question7item");
  };

  // (B7) ON DROP - DO SOMETHING
  item.ondrop = (evt) => {
    evt.preventDefault();
    if (item != current) {
      let currentpos = 0, droppedpos = 0;
      for (let it = 0; it < items.length; it++) {
        if (current == items[it]) { currentpos = it; }
        if (item == items[it]) { droppedpos = it; }
      }
      if (currentpos < droppedpos) {
        item.parentNode.insertBefore(current, item.nextSibling);
      } else {
        item.parentNode.insertBefore(current, item);
      }
    }
    items = document.querySelectorAll("li.question7item");

    //hack to be able to get data from the form
    var results = "";
    for (let it = 0; it < items.length; it++) {
      results += items[it].innerHTML;
      if (it < (items.length - 1)) {
        results += ", "
      }
    }

    document.getElementById('Q7').value = results;

  };

})