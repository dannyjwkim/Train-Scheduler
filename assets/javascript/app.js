$( document ).ready(function() {

  $("#audio").prop("volume", 0.2);

  var correct = 0;
  var wrong = 0;
  var unanswered = 0;
  var timer;
  var count;
  var isCorrect;
  var askedQuestion = [];

  var questionAnswers = [ 
    {
      question: 'The "Best Animated Feature Film" category debuted in 2001 and was won by:',
      choices: [ "Shrek", "Spirited Away", "Toy Story 2", "Monsters, Inc." ],
      answer: "Shrek" + "<br>" + "Hayao Miyazaki's Spirited Away won the following year in 2002" + "<br>" + "Toy Story 2 was released in 1999" + "<br>" + "Pixar's Monsters, Inc. was also nominated, but Dreamworks nabbed the upset inaugural win",
      answerValue: "Shrek", 
      image: "assets/images/shrek.gif"
    },
    {
      question: "The Moonlight/La La Land controversy puts to rest a false rumor that this actress'" + ' "win" was due to a presenter reading the wrong name:',
      choices: [ "Marisa Tomei", "Whoopi Goldberg", "Gwyneth Paltrow", "Renee Zellweger" ],
      answer: "Marisa Tomei" + "<br>" + "Though mostly said in jest, it's been rumored that Jack Palance misspoke in one of the biggest upsets in Oscar history" + "<br>" + "Whoopi Goldberg, Gwyneth Paltrow, and Renee Zellweger are also considered surprise winners",
      answerValue: "MarisaTomei",
      image: "assets/images/tomei.gif"
    },
    {
      question: "Star Wars: The Force Awakens is the highest domestic grossing film of all time period. However, what movie is the highest domestic grossing film of all time - adjusted for inflation?",
      choices: [ "Gone With The Wind", "Star Wars: A New Hope", "The Sound of Music", "Titanic" ],
      answer: "Gone With The Wind" + "<br>" + "Star Wars: The Force Awakens grossed $936.6 million in 2015, but only places 11th all-time" + "<br>" + "Titanic, The Sound of Music, and Star Wars: A New Hope are 5th, 3rd, and 2nd respectively" + "<br>" + "Gone With The Wind grossed nearly $200 million back in 1939 - about $1.75 billion today!",
      answerValue: "GoneWithTheWind",
      image: "assets/images/wind.gif"
    },
    {
      question: "Which actor has the most Oscar nominations with 12?",
      choices: [ "Al Pacino", "Jack Nicholson", "Marlon Brando", "Robert DeNiro" ],
      answer: "Jack Nicholson" + "<br>" + "Nicholson is also tied with Walter Brennan and Daniel Day-Lewis for the most Oscar wins by a male with 3" + "<br>" + "However they only needed 4 and 5 (respectively) nominations to get them" + "<br>" + 'So Nicholson is also the "losingest" actor in Oscar history',
      answerValue: "JackNicholson",
      image: "assets/images/jack.gif"
    },
    {
      question: "Which actress has the most Oscar wins with 4?",
      choices: [ "Jane Fonda", "Judi Dench", "Meryl Streep", "Katharine Hepburn" ],
      answer: "Katharine Hepburn" + "<br>" + "Hepburn won her first Oscar in 1933 and her record 4th nearly 50 years later in 1981" + "<br>" + "While Meryl Streep has the most nominations for any actor or actress with 20" + "<br>" + "However, she only has 3 wins to show for them",
      answerValue: "KatharineHepburn",
      image: "assets/images/hepburn.gif"
    },
    {
      question: "All of these films tied the record for most Oscar nominations (14), except for:",
      choices: [ "La La Land", "All About Eve", "Titanic", "Forrest Gump" ],
      answer: "Forrest Gump" + "<br>" + "Forrest Gump (1994) is one of 9 films to receive 13 nominations" + "<br>" + "Although La La Land (2016), All About Eve (1950), and Titanic (1997) all tied with 14; All About Eve's 14 nominations is a bit more meaningful because there were less categories back then",
      answerValue: "ForrestGump",
      image: "assets/images/gump.gif"
    },
    {
      question: "All of these films tied the record for most Oscar wins (11), except for:",
      choices: [ "West Side Story", "Titanic", "Ben-Hur", "The Lord of the Rings: The Return of the King" ],
      answer: "West Side Story" + "<br>" +"La La Land threatened to join this group, but only won 6 Oscars" + "<br>" + "Thus, although West Side Story couldn't join the top perch of 11 wins, it still handily has the most wins (10) for a musical",
      answerValue: "WestSideStory",
      image: "assets/images/west.gif"
    }, 
    {
      question: "Who is the only person to win an Oscar for playing a real-life Oscar winner?",
      choices: [ "Paul Newman", "Meryl Streep", "Cate Blanchett", "Elizabeth Taylor" ],
      answer: "Cate Blancett" + "<br>" + "Cate Blanchett cemented her unique place in Oscar trivia when she won her first Oscar for her portrayal of Katharine Hepburn in the 2004 film, The Aviator",
      answerValue: "CateBlanchett",
      image: "assets/images/cate.gif"
    },
    {
      question: "Which Foreign Language Film holds the record for most Oscar nominations with 10?",
      choices: [ "Life is Beautiful", "Pan's Labyrinth", "Amour", "Crouching Tiger, Hidden Dragon" ],
      answer: "Crouching Tiger, Hidden Dragon" + "<br>" + "Crouching Tiger Hidden Dragon is one of only 5 films to have been nominated for both categories" + "<br>" + "Not surprisingly, it is also the first (and only) Mandarin film to be nominated for Best Picture",
      answerValue: "CrouchingTiger,HiddenDragon",
      image: "assets/images/crouching.gif"
    },
    {
      question: "Who is the only African-American woman to win an Oscar for Best Actress in a Leading Role?",
      choices: [ "Octavia Spencer", "Viola Davis", "Jennifer Hudson", "Halle Berry" ],
      answer: "Halley Berry" + "<br>" + "All four are Oscar winners, however Halle Berry is still the only African-American woman to win an Oscar for a leading role",
      answerValue: "HalleBerry",
      image: "assets/images/halle.gif"
    },
  ];

  $("#start-button").on("click", function() {
    loadQuestion();
  });

  $(document).on("click", "#start-over", function() {
    startOver();
  });

  function loadQuestion() {
    var current = questionAnswers[0];
    timer = setInterval(countDown, 1000);
    count = 30;
    $("#game-section").html("<div id='timer'><h2>Time remaining: " + count + "</h2></div>");
    $("#game-section").append("<div id='question-section'></div>");
    $("#question-section").append("<h3 id='question'>" + current.question + "</h3></div>");
    $("#question-section").append("<ul id='choices'></ul>");
    for (i = 0; i < current.choices.length; i++) {
      $("#choices").append("<li value=" + current.choices[i].replace(/\s/g,'') + ">" + current.choices[i] + "</li>");
    }

    $("li").on("click", function() {
      clearInterval(timer);
      checkAnswer(this, current);
      loadAnswer(current);
      loadNext();
    });

    function countDown() {
      count--;
      $("#timer").html("<h2>Time remaining: " + count + "</h2>");
      if (count === 0) {
        isCorrect = false;
        clearInterval(timer);
        loadAnswer(current);
        loadNext();
      }
    }
  }

  function checkAnswer(choice, current) {
    if ($(choice).attr("value") === current.answerValue) {
      isCorrect = true;
    }
    else {
      isCorrect = false;
    }
  }

  var result = {
    correct: function(current) {
      $("#question-section").append("<div class='result'><h3>Way to go!</h3></div>");
      $(".result").append("<p>The correct answer is: " + current.answer + "</p>");
      $("#question-section").append("<div><img src='" + current.image + "'></div>");
    },
    wrong: function(current) {
      $("#question-section").append("<div class='result'><h3>Nice try!</h3><div>");
      $(".result").append("<p>But the correct answer is: " + current.answer + "</p>");
      $("#question-section").append("<div><img src='" + current.image + "'></div>");
    },
    timesUp: function(current) {
      $("#question-section").append("<div class='result'><h3>Time's up!</h3></div>");
      $(".result").append("<p>The correct answer is: " + current.answer + "</p>");
      $("#question-section").append("<div><img src='" + current.image + "'></div>");
    }
  }

  function loadAnswer(current) {
    $("#question-section").empty();
    if (isCorrect === true) {
      correct++;
      result.correct(current);
    }
    if ((count === 0) && (isCorrect === false)) {
      unanswered++;
      result.timesUp(current);
    }
    if ((count > 0) && (isCorrect === false)) {
      wrong++;
      result.wrong(current);
    }
  }

  function loadNext() {
    askedQuestion.push(questionAnswers.shift());
    if (questionAnswers.length === 0) {
      setTimeout(loadResults, 10000);
    }
    else {
      setTimeout(loadQuestion, 10000);
    }
  }

  function loadResults() {
    $("#question-section").empty();
    $("#question-section").append("<p id='results' class='result-msg'>YOUR RESULTS</p>");
    $("#results").append("<p class='result-msg'>Correct: " + correct + "</p>");
    $("#results").append("<p class='result-msg'>Wrong: " + wrong + "</p>");
    $("#results").append("<p class='result-msg'>Unanswered: " + unanswered + "</p>");
    $("#game-section").append("<button id='start-over' type='button' class='btn btn-secondary btn-lg'>Start Over</button>");
  }

  function startOver() {
    correct = 0;
    wrong = 0;
    unanswered = 0;
    questionAnswers = askedQuestion;
    askedQuestion = [];

    loadQuestion();
  }

});