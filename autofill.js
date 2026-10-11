(() => {
  'use strict';

  const path = window.location.pathname;
  const isCoursePage = path.includes('/evaluate/evaluateCourse/');
  const isTeacherPage = path.includes('/evaluate/evaluateTeacher/');
  const isLegacyHost = window.location.hostname === 'jwxk.ucas.ac.cn';
  if (!isCoursePage && !isTeacherPage && !isLegacyHost) return;

  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  const shuffle = (items) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  // Pick one token-level phrase from each semantic slot to produce many coherent combinations.
  const compose = (slots) => slots.map((slot) => pick(slot)).join('');
  const fire = (element) => {
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const courseAnswers = {
    favorite: [
      ['我比较喜欢这门课程中', '课程里让我印象较深的是', '我觉得这门课比较有价值的部分是', '整体来看，我比较欣赏课程的'],
      ['基础知识与实际案例的结合', '由浅入深的内容安排', '围绕核心问题展开的学习过程', '不同知识点之间的联系', '理论讲解与应用说明的衔接'],
      ['，讲授思路清楚，重点也比较容易把握', '，内容衔接自然，学习过程比较连贯', '，能帮助我从多个角度理解相关知识', '，对梳理概念和拓展思路都有帮助', '，让课程内容显得更具体也更容易理解'],
      ['，整体学习体验比较充实。', '，这一点值得在后续课程中继续保持。', '，也符合我对课程学习的期待。', '，对建立较完整的知识认识有所帮助。'],
    ],
    improvement: [
      ['我认为课程还可以在', '如果后续能够进一步完善', '从学习体验来看，课程在', '我觉得课程后续可考虑加强'],
      ['课堂互动与讨论机会', '案例分析和知识应用说明', '学习重点与阶段安排', '课后答疑和反馈渠道', '核心内容的总结与梳理'],
      ['方面继续优化，适当增加相关环节', '方面作进一步补充，让安排更加清晰', '方面提供更多支持或实例', '方面做一些循序渐进的调整'],
      ['，这样有助于学生理解重点并及时跟进。', '，也能让理论知识和实际问题联系得更紧密。', '，整体学习过程会更有条理。', '，便于学生结合自身情况安排课后复习。'],
    ],
    interest: [
      ['参与这门课之前，我对', '在选课和学习这门课之前，我对', '开始课程学习之前，我对', '此前接触相关内容时，我对'],
      ['这个学科领域', '相关方向和基础问题', '这一领域的知识与发展', '课程涉及的主题'],
      ['已有一些了解，也保持着一定兴趣', '有初步认识，并希望继续拓展', '抱有好奇，想系统梳理相关知识', '有一定兴趣，希望进一步加深理解'],
      ['，希望通过课程建立更完整的认识。', '，也想了解其中的核心问题和应用场景。', '，因此愿意借课程学习拓展知识面。', '，课程为我提供了继续了解该领域的机会。'],
    ],
    participation: [
      ['关于课堂参与度，我会', '在课程学习和课堂参与方面，我通常会', '结合课程安排，我会', '对于课堂学习与交流，我会'],
      ['跟进课堂内容并整理阶段重点', '根据自己的理解参与讨论和交流', '在课上关注重点并在课后回顾', '结合学习进度提出问题或参与讨论'],
      ['，同时尽量保持稳定的学习节奏', '，并通过课后整理加深理解', '，也会留意自己尚未理解的部分', '，让课堂学习与课后复习相互衔接'],
      ['，整体上希望持续改进参与质量。', '，并根据实际学习需要调整方式。', '，以便更好地掌握课程内容。', '，也期待有更多交流和反馈机会。'],
    ],
  };

  const teacherAnswers = {
    favorite: [
      ['我比较欣赏老师在', '这位老师的教学让我印象较深的是', '我认为老师教学中比较有帮助的部分是', '整体来看，我比较认可老师在'],
      ['课程重点梳理与讲解', '理论知识和实际案例的结合', '课堂节奏与内容衔接', '复杂概念的说明方式', '课堂问题的分析与展开'],
      ['方面的安排，表达清晰且重点明确', '方面的处理，能帮助我跟上学习思路', '方面的表现，让相关内容更容易理解', '方面的做法，能够兼顾知识说明和思路引导'],
      ['，对理解课程内容有积极帮助。', '，也让课堂学习过程更加连贯。', '，有助于我形成比较完整的认识。', '，这一点值得继续保持。'],
    ],
    suggestion: [
      ['我认为后续教学可以在', '如果后续课程能进一步加强', '从学习体验出发，老师可以考虑在', '我建议未来教学继续关注'],
      ['案例拓展与实际应用说明', '课堂互动和答疑机会', '重点难点的归纳与回顾', '阶段学习要求和反馈方式', '不同知识内容之间的衔接'],
      ['方面做适当补充，帮助学生加深理解', '方面继续完善，让学习节奏更加清晰', '方面增加一些灵活安排或具体示例', '方面多提供一些循序渐进的引导'],
      ['，这样能更好地照顾不同的学习需求。', '，也有助于学生及时巩固重点内容。', '，课堂交流和课后复习会更容易衔接。', '，整体教学体验还可以进一步提升。'],
    ],
  };

  const setNamedText = (name, value) => {
    const element = document.getElementsByName(name)[0];
    if (!element) return false;
    element.value = value;
    fire(element);
    return true;
  };

  const setTextareasInOrder = (answers) => {
    const textareas = Array.from(document.querySelectorAll('#regfrm textarea, textarea'));
    if (textareas.length < answers.length) return false;
    answers.forEach((answer, index) => {
      textareas[index].value = answer;
      fire(textareas[index]);
    });
    return true;
  };

  const getRadioGroups = () => {
    const groups = new Map();
    document.querySelectorAll('input[type="radio"][name]').forEach((radio) => {
      if (!groups.has(radio.name)) groups.set(radio.name, []);
      groups.get(radio.name).push(radio);
    });
    return Array.from(groups.values()).filter((group) => group.length >= 2);
  };

  const selectRadio = (radio) => {
    if (!radio) return;
    radio.checked = true;
    fire(radio);
  };

  const choosePositiveOption = (group) => {
    if (!group.length) return;
    selectRadio(group[Math.floor(Math.random() * Math.min(2, group.length))]);
  };

  const courseText = [
    compose(courseAnswers.favorite),
    compose(courseAnswers.improvement),
    `我平均每周在这门课程上花费${5 + Math.floor(Math.random() * 6)}小时`,
    compose(courseAnswers.interest),
    compose(courseAnswers.participation),
  ];

  if (isCoursePage) {
    // Support both the old named fields and the five current course-evaluation textareas.
    const legacyNames = ['item_97', 'item_98', 'item_99', 'item_100', 'item_101'];
    let usedLegacyText = false;
    legacyNames.forEach((name, index) => {
      usedLegacyText = setNamedText(name, courseText[index]) || usedLegacyText;
    });
    if (!usedLegacyText) setTextareasInOrder(courseText);

    // The objective rating matrix appears before question 6. Select among its two most positive columns.
    const groups = getRadioGroups();
    const legacyRoom = Array.from(document.getElementsByName('radio_102'));
    if (legacyRoom.length) {
      const roomD = legacyRoom.find((radio) => radio.id === '105') || legacyRoom[3];
      selectRadio(roomD);
    } else if (groups.length) {
      const roomGroup = groups[groups.length - 1];
      groups.slice(0, -1).forEach(choosePositiveOption);
      // Question 6 option D is the fourth choice: classroom computer and projector work well.
      selectRadio(roomGroup[3]);
    }

    // Question 7 is the only multi-select group on this form; choose a random subset of at least two.
    const checkboxes = Array.from(document.querySelectorAll('#regfrm input[type="checkbox"], input[type="checkbox"]'));
    if (checkboxes.length >= 2) {
      const count = 2 + Math.floor(Math.random() * (checkboxes.length - 1));
      const selected = new Set(shuffle(checkboxes).slice(0, count));
      checkboxes.forEach((checkbox) => {
        checkbox.checked = selected.has(checkbox);
        fire(checkbox);
      });
    }
    return;
  }

  if (isTeacherPage) {
    const teacherText = [compose(teacherAnswers.favorite), compose(teacherAnswers.suggestion)];
    let usedLegacyText = false;
    ['item_145', 'item_146'].forEach((name, index) => {
      usedLegacyText = setNamedText(name, teacherText[index]) || usedLegacyText;
    });
    if (!usedLegacyText) setTextareasInOrder(teacherText);

    const groups = getRadioGroups();
    const legacyTeacherIds = ['133', '134', '136', '137', '139', '140', '141', '142', '143', '144', '148', '149', '150', '151', '152', '153', '154', '155', '156', '157', '158', '159'];
    let matchedLegacy = false;
    legacyTeacherIds.forEach((id) => {
      const radios = Array.from(document.getElementsByName(`item_${id}`));
      const candidates = radios.filter((radio) => ['4', '5'].includes(String(radio.value)));
      if (candidates.length) {
        selectRadio(pick(candidates));
        matchedLegacy = true;
      }
    });
    if (!matchedLegacy) groups.forEach(choosePositiveOption);
  }

  // Legacy host: retain the original text-field compatibility where possible.
  if (isLegacyHost && !isCoursePage && !isTeacherPage) {
    const legacyCourse = ['item_97', 'item_98', 'item_99', 'item_100', 'item_101'];
    legacyCourse.forEach((name, index) => setNamedText(name, courseText[index]));
    ['item_145', 'item_146'].forEach((name, index) => setNamedText(name, compose(index === 0 ? teacherAnswers.favorite : teacherAnswers.suggestion)));
    getRadioGroups().forEach(choosePositiveOption);
  }
})();
