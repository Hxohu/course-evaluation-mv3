(() => {
  'use strict';

  const pick = (items) => items[Math.floor(Math.random() * items.length)];
  const verbs = ['讲得', '教得'];
  const adjectives = ['很有趣，风趣幽默', '生动形象', '引人入胜', '很有意思'];
  const favorite = `老师${pick(verbs)}${pick(adjectives)}，上课能够活跃气氛`;
  const suggestion = '老师讲得很不错，再接再厉，希望以后能够讲得更好';
  const goodFeedback = '这门课很不错，再接再厉，希望以后能够有更多的进步';
  const fire = (element) => {
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  };

  // Keep compatibility with the original course-evaluation form fields.
  const setNamedText = (name, value) => {
    const element = document.getElementsByName(name)[0];
    if (!element) return false;
    element.value = value;
    fire(element);
    return true;
  };

  const setNamedRadioGroup = (name, values) => {
    const radios = Array.from(document.getElementsByName(name));
    if (!radios.length) return false;
    const candidates = radios.filter((radio) => values.includes(String(radio.value)));
    const target = pick(candidates.length ? candidates : radios);
    target.checked = true;
    fire(target);
    return true;
  };

  let usedLegacyFields = false;
  [
    ['item_97', favorite],
    ['item_98', goodFeedback],
    ['item_99', `我平均每周在这门课上花费${Math.floor(Math.random() * 15)}小时`],
    ['item_100', `在参与这门课之前，我对这个学科领域${pick(['有一定了解', '很感兴趣', '有点兴趣', '兴趣一般', '不甚了解', '不是很有兴趣', '感觉不好不坏'])}`],
    ['item_101', `我出勤完整，在课堂回答问题方面${pick(['表现积极', '表现一般', '表现活跃', '回答较少'])}`],
    ['item_145', favorite],
    ['item_146', suggestion],
  ].forEach(([name, value]) => { usedLegacyFields = setNamedText(name, value) || usedLegacyFields; });

  const legacyRadioNames = [
    ...['88', '89', '90', '92', '93', '94', '95', '96', '116', '117', '118', '119', '120', '122', '123', '124', '125', '126', '128', '129', '130', '131'].map((id) => `item_${id}`),
    ...['133', '134', '136', '137', '139', '140', '141', '142', '143', '144', '148', '149', '150', '151', '152', '153', '154', '155', '156', '157', '158', '159'].map((id) => `item_${id}`),
  ];
  let matchedLegacyRadio = false;
  legacyRadioNames.forEach((name) => {
    matchedLegacyRadio = setNamedRadioGroup(name, ['4', '5']) || matchedLegacyRadio;
  });
  setNamedRadioGroup('radio_102', ['102', '103', '104', '105', '106']);

  // The current UCAS teacher-evaluation page uses unnamed-by-ID groups and two textareas.
  // Its rating columns are ordered from most positive to least positive in the form DOM.
  if (!matchedLegacyRadio) {
    const groups = new Map();
    document.querySelectorAll('input[type="radio"][name]').forEach((radio) => {
      if (!groups.has(radio.name)) groups.set(radio.name, []);
      groups.get(radio.name).push(radio);
    });
    groups.forEach((radios) => {
      if (radios.length < 5) return;
      const selected = radios[Math.floor(Math.random() * Math.min(2, radios.length))];
      selected.checked = true;
      fire(selected);
    });
  }

  if (!usedLegacyFields) {
    const textareas = Array.from(document.querySelectorAll('textarea'));
    if (textareas.length >= 2) {
      [favorite, suggestion].forEach((value, index) => {
        textareas[index].value = value;
        fire(textareas[index]);
      });
    }
  }
})();
